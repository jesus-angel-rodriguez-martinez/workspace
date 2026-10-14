import { composeApi } from '@infrastructures/api';
import { composeAuthentication } from '@infrastructures/authentication';
import { composeConfiguration } from '@infrastructures/configuration';
import { composeCryptography } from '@infrastructures/cryptography';
import { type IDatabase, type IDatabaseSchema } from '@infrastructures/database';
import { shutdown } from '@infrastructures/lifecycle';
import { composeLogger } from '@infrastructures/logger';
import { composeToken } from '@infrastructures/token';
import { composeUser } from '@infrastructures/user';
import { ClientService, PathService } from '@libs/database';
import { type AbstractLoggerService } from '@libs/logger';

let database: IDatabase | undefined;
let loggerService: AbstractLoggerService | undefined;

const init = async () => {
  try {
    const {
      API_PORT,
      DATABASE,
      DATABASE_CERTIFICATE_FILE_NAME,
      DATABASE_HOST,
      DATABASE_PASSWORD,
      DATABASE_PORT,
      DATABASE_USER,
      ENVIRONMENT,
      JWT_SECRET
    } = composeConfiguration({
      API_PORT: { required: true, type: 'number' },
      DATABASE: { required: true, type: 'string' },
      DATABASE_CERTIFICATE_FILE_NAME: { required: true, type: 'string' },
      DATABASE_HOST: { required: true, type: 'string' },
      DATABASE_PASSWORD: { required: true, type: 'string' },
      DATABASE_PORT: { required: true, type: 'number' },
      DATABASE_USER: { required: true, type: 'string' },
      ENVIRONMENT: { required: true, type: 'string' },
      JWT_SECRET: { required: true, type: 'string' }
    });
    const isDevelopment = ENVIRONMENT === 'development';

    loggerService = composeLogger({
      level: isDevelopment ? 'trace' : 'info',
      name: '@apis/identity',
      prettify: isDevelopment
    });
    loggerService.debug('🔧 Logger service ready');

    const cryptographyService = composeCryptography({
      digest: 'sha256',
      iterations: 100_000,
      keyLength: 64,
      saltLength: 16
    });
    loggerService.debug('🔧 Cryptography service ready');

    const tokenService = composeToken({
      algorithm: 'HS256',
      expiresIn: 3_600,
      secret: JWT_SECRET
    });
    loggerService.debug('🔧 Token service ready');

    const pathService = new PathService();
    loggerService.debug('🔧 Path service ready');

    const clientService = new ClientService<IDatabaseSchema>({
      certificateFileName: DATABASE_CERTIFICATE_FILE_NAME,
      database: DATABASE,
      host: DATABASE_HOST,
      password: DATABASE_PASSWORD,
      pathService,
      port: DATABASE_PORT,
      user: DATABASE_USER
    });
    loggerService.debug('🔧 Client service ready');

    database = clientService.createClient();
    loggerService.debug('🔧 Database client ready');

    const { userApiMapper, userApp, userRepository } = composeUser({
      cryptographyService,
      database
    });
    loggerService.debug('📦 User repository ready');
    loggerService.debug('🧩 User application ready');

    const { authenticationApiMapper, authenticationApp, authenticationResponseMapper } =
      composeAuthentication({
        cryptographyService,
        tokenService,
        userApp,
        userRepository
      });
    loggerService.debug('🧩 Authentication application ready');

    const api = await composeApi({
      authenticationApiMapper,
      authenticationApp,
      authenticationResponseMapper,
      loggerService,
      userApiMapper
    });
    loggerService.debug('🌐 API ready');

    await api.listen(API_PORT);
    loggerService.info('🚀 API listening', {
      environment: ENVIRONMENT,
      port: API_PORT
    });
  } catch (e) {
    await shutdown({ database, loggerService, reason: { error: e as Error } });
  }
};

await init();

process.on('SIGINT', () => shutdown({ database, loggerService, reason: { signal: 'SIGINT' } }));
process.on('SIGTERM', () => shutdown({ database, loggerService, reason: { signal: 'SIGTERM' } }));

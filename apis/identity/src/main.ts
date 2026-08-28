import { composeApi } from '@infrastructures/api';
import { composeAuthentication } from '@infrastructures/authentication';
import { composeConfiguration } from '@infrastructures/configuration';
import { composeCryptography } from '@infrastructures/cryptography';
import { type IDatabase, type IDatabaseSchema } from '@infrastructures/database';
import { shutdown } from '@infrastructures/lifecycle';
import { composeLogger } from '@infrastructures/logger';
import { composeToken } from '@infrastructures/token';
import { composeUser } from '@infrastructures/user';
import { ClientService } from '@libs/database';
import { type AbstractLoggerService } from '@libs/logger';

let database: IDatabase | undefined;
let loggerService: AbstractLoggerService | undefined;

const init = async () => {
  try {
    const {
      /* 📡 API configuration. */
      API_PORT,
      DATABASE,
      DATABASE_HOST,
      DATABASE_PASSWORD,
      DATABASE_PORT,
      DATABASE_USER,
      /* ⚙️ Environment configuration. */
      ENVIRONMENT,
      /* 🔒 JWT configuration. */
      JWT_SECRET
    } = composeConfiguration({
      API_PORT: 'number',
      DATABASE: 'string',
      DATABASE_HOST: 'string',
      DATABASE_PASSWORD: 'string',
      DATABASE_PORT: 'number',
      DATABASE_USER: 'string',
      ENVIRONMENT: 'string',
      JWT_SECRET: 'string'
    });

    const isDevelopment = ENVIRONMENT === 'development';
    loggerService = composeLogger({
      applicationName: '@apis/identity',
      level: isDevelopment ? 'trace' : 'info',
      loggerName: import.meta.url,
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

    const clientService = new ClientService<IDatabaseSchema>({
      database: DATABASE,
      host: DATABASE_HOST,
      password: DATABASE_PASSWORD,
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

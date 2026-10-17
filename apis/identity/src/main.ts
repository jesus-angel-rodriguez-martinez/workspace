import { AuthenticationApp } from '@domains/authentication';
import { UserApp } from '@domains/user';
import { ApiModule } from '@infrastructures/api';
import {
  AuthenticationApiMapper,
  AuthenticationResponseMapper,
  UserCredentialsValidator
} from '@infrastructures/authentication';
import { type IDatabase, type IDatabaseSchema } from '@infrastructures/database';
import { shutdown } from '@infrastructures/lifecycle';
import {
  CreateUserValidator,
  PostgresUserRepository,
  UserApiMapper,
  UserModelMapper
} from '@infrastructures/user';
import { ApiExceptionFilter, ApiInterceptor, ApiMapper, LoggerAdapter } from '@libs/api';
import { ConfigurationService } from '@libs/configuration';
import {
  CertificateService,
  CertificateValidator,
  ClientService,
  ClientValidator,
  PathService
} from '@libs/database';
import { type AbstractLoggerService, LoggerService } from '@libs/logger';
import { CryptographyService, CryptographyValidator, TokenService, TokenValidator } from '@libs/security';
import { NestFactory } from '@nestjs/core';

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
      JWT_ACCESS_SECRET,
      JWT_REFRESH_SECRET
    } = new ConfigurationService({
      API_PORT: { required: true, type: 'number' },
      DATABASE: { required: true, type: 'string' },
      DATABASE_CERTIFICATE_FILE_NAME: { required: false, type: 'string' },
      DATABASE_HOST: { required: true, type: 'string' },
      DATABASE_PASSWORD: { required: true, type: 'string' },
      DATABASE_PORT: { required: true, type: 'number' },
      DATABASE_USER: { required: true, type: 'string' },
      ENVIRONMENT: { required: true, type: 'string' },
      JWT_ACCESS_SECRET: { required: true, type: 'string' },
      JWT_REFRESH_SECRET: { required: true, type: 'string' }
    }).getAll();

    const isDevelopment = ENVIRONMENT === 'development';
    LoggerService.init({
      level: isDevelopment ? 'trace' : 'info',
      name: '@apis/identity',
      prettify: isDevelopment
    });

    loggerService = new LoggerService();
    loggerService.debug('🔧 Logger service ready');

    const cryptographyValidator = new CryptographyValidator();
    loggerService.debug('🔧 Cryptography validator ready');

    const cryptographyService = new CryptographyService({
      configuration: {
        digest: 'sha256',
        iterations: 600_000,
        keyLength: 32,
        saltLength: 16
      },
      cryptographyValidator
    });
    loggerService.debug('🔧 Cryptography service ready');

    const tokenValidator = new TokenValidator();
    loggerService.debug('🔧 Token validator ready');

    const accessTokenService = new TokenService({
      configuration: {
        algorithm: 'HS256',
        expiresIn: 15 * 60,
        secret: JWT_ACCESS_SECRET,
        type: 'access'
      },
      tokenValidator
    });
    loggerService.debug('🔧 Access token service ready');

    const refreshTokenService = new TokenService({
      configuration: {
        algorithm: 'HS256',
        expiresIn: 7 * 24 * 60 * 60,
        secret: JWT_REFRESH_SECRET,
        type: 'refresh'
      },
      tokenValidator
    });
    loggerService.debug('🔧 Refresh token service ready');

    const pathService = new PathService();
    loggerService.debug('🔧 Path service ready');

    const certificateValidator = new CertificateValidator({ pathService });
    loggerService.debug('🔧 Certificate validator ready');

    const certificateService = DATABASE_CERTIFICATE_FILE_NAME
      ? new CertificateService({
          certificateValidator,
          configuration: {
            fileName: DATABASE_CERTIFICATE_FILE_NAME
          },
          pathService
        })
      : undefined;
    loggerService.debug(
      certificateService ? '🔧 Certificate service ready' : '🔧 Certificate service skipped'
    );

    const clientValidator = new ClientValidator();
    loggerService.debug('🔧 Client validator ready');

    const clientService = new ClientService<IDatabaseSchema>({
      certificateService,
      clientValidator,
      configuration: {
        database: DATABASE,
        host: DATABASE_HOST,
        password: DATABASE_PASSWORD,
        port: DATABASE_PORT,
        user: DATABASE_USER
      }
    });
    loggerService.debug('🔧 Client service ready');

    database = clientService.createClient();
    loggerService.debug('🔧 Database client ready');

    const createUserValidator = new CreateUserValidator();

    const userApiMapper = new UserApiMapper();

    const userModelMapper = new UserModelMapper();

    const userRepository = new PostgresUserRepository(database);
    loggerService.debug('📦 User repository ready');

    const userApp = new UserApp({
      createUserValidator,
      cryptographyService,
      userModelMapper,
      userRepository
    });
    loggerService.debug('🧩 User application ready');

    const authenticationApiMapper = new AuthenticationApiMapper();

    const userCredentialsValidator = new UserCredentialsValidator();

    const authenticationApp = new AuthenticationApp({
      accessTokenService,
      cryptographyService,
      refreshTokenService,
      userApp,
      userCredentialsValidator,
      userRepository
    });
    loggerService.debug('🧩 Authentication application ready');

    const authenticationResponseMapper = new AuthenticationResponseMapper();

    const logger = new LoggerAdapter(loggerService);

    const apiMapper = new ApiMapper({ mappers: [userApiMapper, authenticationApiMapper] });
    const apiExceptionFilter = new ApiExceptionFilter({ apiMapper, loggerService });
    const apiInterceptor = new ApiInterceptor();

    const entryModule = ApiModule.forRoot(authenticationApp, authenticationResponseMapper);
    const api = await NestFactory.create(entryModule, {
      bufferLogs: true,
      logger
    });

    api.useGlobalFilters(apiExceptionFilter);
    api.useGlobalInterceptors(apiInterceptor);
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

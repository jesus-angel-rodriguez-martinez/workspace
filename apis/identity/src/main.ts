import { composeApi } from '@infrastructures/api';
import { composeAuthentication } from '@infrastructures/authentication';
import { composeConfigurations } from '@infrastructures/configurations';
import { composeCryptography } from '@infrastructures/cryptography';
import { shutdown } from '@infrastructures/lifecycle';
import { composeLoggers } from '@infrastructures/loggers';
import { composeTokens } from '@infrastructures/tokens';
import { composeUsers } from '@infrastructures/users';
import { type AbstractLoggerService } from '@libs/logger';

let loggerService: AbstractLoggerService | undefined;

const init = async () => {
  try {
    const { API_PORT, ENVIRONMENT, JWT_SECRET } = composeConfigurations({
      API_PORT: 'number',
      ENVIRONMENT: 'string',
      JWT_SECRET: 'string'
    });

    const isDevelopment = ENVIRONMENT === 'development';
    loggerService = composeLoggers({
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

    const tokenService = composeTokens({
      algorithm: 'HS256',
      expiresIn: 3_600,
      secret: JWT_SECRET
    });
    loggerService.debug('🔧 Token service ready');

    const { usersApiMapper, usersApp, usersRepository } = composeUsers({
      cryptographyService
    });
    loggerService.debug('📦 User repository ready');
    loggerService.debug('🧩 User application ready');

    const { authenticationApiMapper, authenticationApp, authenticationResponseMapper } =
      composeAuthentication({
        cryptographyService,
        tokenService,
        usersApp,
        usersRepository
      });
    loggerService.debug('🧩 Authentication application ready');

    const api = await composeApi({
      authenticationApiMapper,
      authenticationApp,
      authenticationResponseMapper,
      loggerService,
      usersApiMapper
    });
    loggerService.debug('🌐 API ready');

    await api.listen(API_PORT);
    loggerService.info('🚀 API listening', {
      environment: ENVIRONMENT,
      port: API_PORT
    });
  } catch (e) {
    await shutdown({ loggerService, reason: { error: e as Error } });
  }
};

await init();

process.on('SIGINT', () => shutdown({ loggerService, reason: { signal: 'SIGINT' } }));
process.on('SIGTERM', () => shutdown({ loggerService, reason: { signal: 'SIGTERM' } }));

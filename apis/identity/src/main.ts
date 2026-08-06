import { AuthenticationApp } from '@domains/authentication';
import { composeApi } from '@infrastructures/api';
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

    const cryptographyService = composeCryptography({
      digest: 'sha256',
      iterations: 100_000,
      keyLength: 64,
      saltLength: 16
    });

    const tokenService = composeTokens({
      algorithm: 'HS256',
      expiresIn: 3_600,
      secret: JWT_SECRET
    });

    const { usersApp, usersRepository } = composeUsers({
      cryptographyService
    });

    const authenticationApp = new AuthenticationApp({
      cryptographyService,
      tokenService,
      usersApp,
      usersRepository
    });

    const api = await composeApi({
      authenticationApp
    });

    await api.listen(API_PORT);
  } catch (e) {
    await shutdown({ loggerService, reason: { error: e as Error } });
  }
};

await init();

process.on('SIGINT', () => shutdown({ loggerService, reason: { signal: 'SIGINT' } }));
process.on('SIGTERM', () => shutdown({ loggerService, reason: { signal: 'SIGTERM' } }));

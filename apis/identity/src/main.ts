import { AuthenticationApp } from '@domains/authentication';
import { composeApis } from '@infrastructures/apis';
import { composeConfigurations } from '@infrastructures/configurations';
import { composeCryptography } from '@infrastructures/cryptography';
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

    const token = await authenticationApp.signUp({
      name: 'test',
      password: 'Fake-P@ssw0rd',
      username: 'test'
    });

    loggerService.info(`User signed up at PORT: ${API_PORT}.`, { token });

    await composeApis({
      usersApp
    });
  } catch (e) {
    const error = e as Error;

    if (loggerService) {
      loggerService.fatal('Critical error encountered.', { error });
    } else {
      console.error('Logger service unavailable during critical failure.', error);
    }

    process.exit(1);
  }
};

const shutdown = async (signal: 'SIGINT' | 'SIGTERM') => {
  const message = `${signal} received. Shutting down API.`;

  if (!loggerService) {
    console.error(`Logger service unavailable during ${signal}.`, message);
  } else {
    loggerService.info(message);
  }

  process.exit(0);
};

await init();
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

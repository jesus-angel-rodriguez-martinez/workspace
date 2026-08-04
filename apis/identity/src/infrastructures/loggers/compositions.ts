import { LoggerService } from '@libs/logger';

export const composeLogger = (environment: string) => {
  const isDevelopment = environment === 'development';

  LoggerService.init({
    applicationName: '@apis/identity',
    level: isDevelopment ? 'trace' : 'info',
    prettify: isDevelopment
  });

  const loggerService = new LoggerService({
    loggerName: import.meta.url
  });
  return { loggerService };
};

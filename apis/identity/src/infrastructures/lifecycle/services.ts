import { type Shutdown } from '@infrastructures/lifecycle';

export const shutdown: Shutdown = async ({ loggerService, reason }) => {
  if ('error' in reason) {
    const { error } = reason;
    const message = 'Critical error encountered.';

    if (loggerService) {
      loggerService.fatal(message, { error });
    } else {
      console.error('Logger service unavailable during shutdown.', error);
    }

    process.exit(1);
  } else {
    const { signal } = reason;
    const message = `${signal} received.`;

    if (loggerService) {
      loggerService.info(message);
    } else {
      console.error('Logger service unavailable during shutdown.', message);
    }

    process.exit(0);
  }
};

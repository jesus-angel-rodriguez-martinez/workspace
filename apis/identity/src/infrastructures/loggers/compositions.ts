import { type ComposeLoggers } from '@infrastructures/loggers';
import { LoggerService } from '@libs/logger';

export const composeLoggers: ComposeLoggers = ({ applicationName, level, loggerName, prettify }) => {
  LoggerService.init({ applicationName, level, prettify });
  const loggerService = new LoggerService({ loggerName });
  return loggerService;
};

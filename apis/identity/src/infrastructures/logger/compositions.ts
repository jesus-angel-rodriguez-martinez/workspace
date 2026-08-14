import { type ComposeLogger } from '@infrastructures/logger';
import { LoggerService } from '@libs/logger';

export const composeLogger: ComposeLogger = ({ applicationName, level, loggerName, prettify }) => {
  LoggerService.init({ applicationName, level, prettify });
  const loggerService = new LoggerService({ loggerName });
  return loggerService;
};

import { type ComposeLogger } from '@infrastructures/logger';
import { LoggerService } from '@libs/logger';

export const composeLogger: ComposeLogger = ({ level, name, prettify }) => {
  LoggerService.init({ level, name, prettify });
  const loggerService = new LoggerService();
  return loggerService;
};

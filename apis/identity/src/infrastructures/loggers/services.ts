import { shouldPrettify } from '@infrastructures/loggers';
import { LoggerService } from '@libs/logger';

LoggerService.init({
  applicationName: 'identity',
  level: shouldPrettify ? 'trace' : 'info',
  prettify: shouldPrettify
});

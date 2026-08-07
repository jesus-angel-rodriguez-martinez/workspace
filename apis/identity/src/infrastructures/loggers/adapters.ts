import { type AbstractLoggerService } from '@libs/logger';
import { type LoggerService } from '@nestjs/common';

export class LoggerAdapter implements LoggerService {
  private readonly loggerService: AbstractLoggerService;

  constructor(loggerService: AbstractLoggerService) {
    this.loggerService = loggerService;
  }

  debug(message: string): void {
    this.loggerService.debug(message);
  }

  error(message: string): void {
    this.loggerService.error(message);
  }

  fatal(message: string): void {
    this.loggerService.fatal(message);
  }

  log(message: string): void {
    this.loggerService.info(message);
  }

  verbose(message: string): void {
    this.loggerService.trace(message);
  }

  warn(message: string): void {
    this.loggerService.warn(message);
  }
}

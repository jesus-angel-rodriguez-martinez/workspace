import { AbstractApiLoggerService, type IApiLoggerServiceOptions } from '@domains/logger';
import { type LoggerService } from '@nestjs/common';

export class ApiLoggerService extends AbstractApiLoggerService implements LoggerService {
  private readonly ignoredContexts = [
    'InstanceLoader',
    'NestApplication',
    'NestFactory',
    'RouterExplorer',
    'RoutesResolver'
  ];

  public constructor(options: IApiLoggerServiceOptions) {
    super(options);
  }

  public debug(message: string): void {
    this.loggerService.debug(message);
  }

  public error(message: string): void {
    this.loggerService.error(message);
  }

  public fatal(message: string): void {
    this.loggerService.fatal(message);
  }

  public log(message: string, context?: string): void {
    if (context && this.ignoredContexts.includes(context)) {
      return;
    }
    this.loggerService.info(message);
  }

  public verbose(message: string): void {
    this.loggerService.trace(message);
  }

  public warn(message: string): void {
    this.loggerService.warn(message);
  }
}

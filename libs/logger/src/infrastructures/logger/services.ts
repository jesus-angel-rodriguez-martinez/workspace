import pino, { type Logger, type LoggerOptions, stdTimeFunctions } from 'pino';
import {
  AbstractLoggerService,
  type ILoggerServiceInitConfiguration,
  LoggerAlreadyInitializedError,
  type LoggerContext,
  type LoggerLevel,
  LoggerNotInitializedError
} from '@domains/logger';

export class LoggerService extends AbstractLoggerService {
  protected static rootLogger: Logger | undefined;

  /**
   * @throws {LoggerNotInitializedError} When the logger has not been initialized.
   */
  public constructor() {
    if (!LoggerService.rootLogger) {
      throw new LoggerNotInitializedError();
    }
    super();
  }

  public static close(): void {
    LoggerService.rootLogger = undefined;
  }

  /**
   * Initializes the root logger shared by every logger service.
   *
   * @param configuration - The logger configuration.
   *
   * @throws {LoggerAlreadyInitializedError} When the logger is already initialized.
   */
  public static init(configuration: ILoggerServiceInitConfiguration): void {
    if (LoggerService.rootLogger) {
      throw new LoggerAlreadyInitializedError();
    }

    const { level, name, prettify } = configuration;

    const loggerOptions: LoggerOptions = {
      base: {},
      errorKey: 'error',
      level,
      name,
      timestamp: stdTimeFunctions.isoTime
    };

    if (prettify) {
      loggerOptions.transport = {
        options: {
          translateTime: 'yyyy-mm-dd HH:MM:ss'
        },
        target: 'pino-pretty'
      };
    }

    LoggerService.rootLogger = pino(loggerOptions);
  }

  public trace(message: string, context?: LoggerContext): void {
    this.log('trace', message, context);
  }

  public debug(message: string, context?: LoggerContext): void {
    this.log('debug', message, context);
  }

  public info(message: string, context?: LoggerContext): void {
    this.log('info', message, context);
  }

  public warn(message: string, context?: LoggerContext): void {
    this.log('warn', message, context);
  }

  public error(message: string, context?: LoggerContext): void {
    this.log('error', message, context);
  }

  public fatal(message: string, context?: LoggerContext): void {
    this.log('fatal', message, context);
  }

  protected log(level: LoggerLevel, message: string, context: LoggerContext = {}): void {
    if (!LoggerService.rootLogger) {
      throw new LoggerNotInitializedError();
    }
    LoggerService.rootLogger[level](context, message);
  }
}

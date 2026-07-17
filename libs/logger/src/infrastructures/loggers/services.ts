import { parse, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import pino, { type Logger, type LoggerOptions, stdTimeFunctions } from 'pino';
import {
  AbstractLoggerService,
  type ILoggerServiceConfiguration,
  type ILoggerServiceInitConfiguration,
  LOGGER_RULES,
  LoggerAlreadyInitializedError,
  type LoggerContext,
  type LoggerLevel,
  LoggerNotInitializedError
} from '@domains/loggers';

export class LoggerService extends AbstractLoggerService {
  protected static childLoggers: Record<string, Logger>;
  protected static rootLogger: Logger;
  protected readonly loggerName: string;

  public constructor(configuration: ILoggerServiceConfiguration) {
    if (!LoggerService.rootLogger) {
      throw new LoggerNotInitializedError();
    }
    super(configuration);

    this.loggerName = this.formatLoggerName(configuration.loggerName);

    if (!LoggerService.childLoggers[this.loggerName]) {
      LoggerService.childLoggers[this.loggerName] = LoggerService.rootLogger.child({
        logger: this.loggerName
      });
    }
  }

  public static init(configuration: ILoggerServiceInitConfiguration): void {
    if (LoggerService.rootLogger) {
      throw new LoggerAlreadyInitializedError();
    }

    const { applicationName, level, prettify } = configuration;

    const loggerOptions: LoggerOptions = {
      base: {},
      errorKey: 'error',
      level,
      name: applicationName,
      timestamp: stdTimeFunctions.isoTime
    };

    if (prettify) {
      loggerOptions.transport = {
        target: 'pino-pretty'
      };
    }

    LoggerService.childLoggers = {};
    LoggerService.rootLogger = pino(loggerOptions);
  }

  public static async close(): Promise<void> {
    if (!LoggerService.rootLogger) {
      return;
    }

    await new Promise<void>((resolve) => {
      LoggerService.rootLogger.flush(() => resolve());
    });

    LoggerService.rootLogger = undefined as unknown as Logger;
    LoggerService.childLoggers = {};
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

  protected formatLoggerName(loggerName: string): string {
    if (!loggerName.startsWith('file:')) {
      return loggerName;
    }

    const segments = fileURLToPath(loggerName).split(sep);

    const srcIndex = segments.lastIndexOf('src');
    const distIndex = segments.lastIndexOf('dist');

    const rootIndex = Math.max(srcIndex, distIndex);
    if (rootIndex < LOGGER_RULES.packageName.DEPTH) {
      return loggerName;
    }

    const packageName = segments.slice(rootIndex - LOGGER_RULES.packageName.DEPTH, rootIndex).join('/');

    const modules = segments.slice(rootIndex + 1);
    const fileName = parse(modules.pop() ?? '').name;

    const feature = modules.length > 0 ? modules.join('/') : fileName === 'index' ? '' : fileName;
    return feature ? `@${packageName}/${feature}` : `@${packageName}`;
  }

  protected log(level: LoggerLevel, message: string, context: LoggerContext = {}): void {
    this.logger[level](context, message);
  }

  protected get logger(): Logger {
    return LoggerService.childLoggers[this.loggerName] || LoggerService.rootLogger;
  }
}

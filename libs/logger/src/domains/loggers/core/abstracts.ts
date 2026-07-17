import { type ILoggerServiceConfiguration, type LoggerContext, type LoggerLevel } from '@domains/loggers';

/**
 * Abstract base class for logging services.
 *
 * Provides a consistent interface for structured logging across different log levels.
 */
export abstract class AbstractLoggerService {
  /**
   * Logger configuration options.
   */
  protected readonly configuration: ILoggerServiceConfiguration;

  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   *
   * @param configuration - Logger configuration options.
   */
  protected constructor(configuration: ILoggerServiceConfiguration) {
    this.configuration = configuration;
  }

  /**
   * Logs a `trace` level message.
   *
   * Used for the most detailed logs, often capturing execution flow and function entry/exit.
   *
   * @param message - The message to log.
   * @param context - The optional context to log.
   */
  public abstract trace(message: string, context?: LoggerContext): void;
  /**
   * Logs a `debug` level message.
   *
   * Typically used for verbose diagnostic information useful during development.
   *
   * @param message - The message to log.
   * @param context - The optional context to log.
   */
  public abstract debug(message: string, context?: LoggerContext): void;
  /**
   * Logs an `info` level message.
   *
   * Used for general operational messages that represent normal system behavior.
   *
   * @param message - The message to log.
   * @param context - The optional context to log.
   */
  public abstract info(message: string, context?: LoggerContext): void;
  /**
   * Logs a `warn` level message.
   *
   * Indicates potentially harmful situations that do not prevent program execution.
   *
   * @param message - The message to log.
   * @param context - The optional context to log.
   */
  public abstract warn(message: string, context?: LoggerContext): void;
  /**
   * Logs an `error` level message.
   *
   * Intended for recoverable operational errors or exceptions.
   *
   * @param message - The message to log.
   * @param context - The optional context to log.
   */
  public abstract error(message: string, context?: LoggerContext): void;
  /**
   * Logs a `fatal` level message.
   *
   * Used for critical, unrecoverable errors that typically require process termination.
   *
   * @param message - The message to log.
   * @param context - The optional context to log.
   */
  public abstract fatal(message: string, context?: LoggerContext): void;
  /**
   * Formats a raw logger name into the stable identifier shown in log entries.
   *
   * Converts a module reference to a concise, package-scoped name.
   *
   * @param loggerName - The configured logger name.
   * @returns The formatted logger name.
   */
  protected abstract formatLoggerName(loggerName: string): string;
  /**
   * Logs a message at the specified log level.
   *
   * This method centralizes the common logging logic shared across all log levels.
   *
   * @param level - The log level at which the message should be logged.
   * @param message - The message to log.
   * @param context - The context to log.
   */
  protected abstract log(level: LoggerLevel, message: string, context: LoggerContext): void;
}

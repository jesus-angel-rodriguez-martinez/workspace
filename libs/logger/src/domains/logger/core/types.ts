/**
 * Represents the configuration settings for an individual logger instance.
 */
export interface ILoggerServiceConfiguration {
  /**
   * Logical name of the logger instance representing the module, file, or feature.
   */
  readonly loggerName: string;
}

/**
 * Defines the complete configuration options for initializing the logger service.
 */
export interface ILoggerServiceInitConfiguration {
  /**
   * Name of the application that produces the logs.
   */
  readonly applicationName: string;
  /**
   * The minimum severity level to log.
   */
  readonly level: LoggerLevel;
  /**
   * Enables human-readable log output.
   */
  readonly prettify: boolean;
}

/**
 * Generic context that can be attached to log entries.
 */
export type LoggerContext = LoggerDataContext & LoggerErrorContext;

/**
 * Generic data context that can be attached to log entries.
 */
export type LoggerDataContext = Record<string, unknown>;

/**
 * Generic error context that can be attached to log entries.
 */
export type LoggerErrorContext = {
  error?: Error;
};

/**
 * Describes the severity level of a log message.
 *
 * Ordered from **most verbose** ('trace') to **most severe** ('fatal').
 */
export type LoggerLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

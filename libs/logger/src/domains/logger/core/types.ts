/**
 * Describes the critical severity level of a log message.
 *
 * Ordered from **least severe** ('warn') to **most severe** ('fatal').
 */
export type CriticalLoggerLevel = 'warn' | 'error' | 'fatal';

/**
 * Describes the diagnostic severity level of a log message.
 *
 * Ordered from **most verbose** ('trace') to **least verbose** ('info').
 */
export type DiagnosticLoggerLevel = 'trace' | 'debug' | 'info';

/**
 * Defines the complete configuration options for initializing the logger service.
 */
export interface ILoggerServiceInitConfiguration {
  /**
   * The minimum severity level to log.
   */
  readonly level: LoggerLevel;
  /**
   * Name of the application that produces the logs.
   */
  readonly name: string;
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
export type LoggerLevel = DiagnosticLoggerLevel | CriticalLoggerLevel;

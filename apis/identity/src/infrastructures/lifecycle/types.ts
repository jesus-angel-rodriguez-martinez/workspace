import { type AbstractLoggerService } from '@libs/logger';

export interface IShutdownConfiguration {
  /**
   * Logging service used for structured output and diagnostics.
   */
  loggerService: AbstractLoggerService | undefined;
  /**
   * Describes why the application is shutting down.
   */
  reason: ShutdownReason;
}

export type Shutdown = (configuration: IShutdownConfiguration) => Promise<never>;

export type ShutdownReason = { error: Error } | { signal: 'SIGINT' | 'SIGTERM' };

import { type IDatabase } from '@infrastructures/database';
import { type AbstractLoggerService } from '@libs/logger';

export interface IShutdownOptions {
  /**
   * The database client to close before shutting down.
   */
  readonly database: IDatabase | undefined;
  /**
   * Logging service used for structured output and diagnostics.
   */
  readonly loggerService: AbstractLoggerService | undefined;
  /**
   * Describes why the application is shutting down.
   */
  readonly reason: ShutdownReason;
}

export type Shutdown = (options: IShutdownOptions) => Promise<never>;

export type ShutdownReason = { error: Error } | { signal: 'SIGINT' | 'SIGTERM' };

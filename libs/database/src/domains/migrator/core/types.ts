import { type AbstractLoggerService } from '@libs/logger';

/**
 * Options to construct a migrator service.
 */
export interface IMigratorServiceConfiguration {
  /**
   * Logging service used for structured output and diagnostics.
   */
  loggerService: AbstractLoggerService;
}

/**
 * The direction a migration run should take.
 */
export type MigrationCommand = 'down' | 'reset' | 'up';

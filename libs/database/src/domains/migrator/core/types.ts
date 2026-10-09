import { type AbstractPathService } from '@domains/path';
import { type AbstractLoggerService } from '@libs/logger';

/**
 * Options to construct a migrator service.
 */
export interface IMigratorServiceConfiguration {
  /**
   * Logging service used for structured output and diagnostics.
   */
  readonly loggerService: AbstractLoggerService;
  /**
   * Resolves the filesystem paths.
   */
  readonly pathService: AbstractPathService;
}

/**
 * The direction a migration run should take.
 */
export type MigrationCommand = 'down' | 'reset' | 'up';

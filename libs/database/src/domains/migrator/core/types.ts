import { type AbstractClientService } from '@domains/client';
import { type AbstractPathService } from '@domains/path';
import { type AbstractLoggerService } from '@libs/logger';

export interface IMigratorServiceOptions<Client> {
  /**
   * Provides the database client migrations run against.
   */
  readonly clientService: AbstractClientService<Client>;
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

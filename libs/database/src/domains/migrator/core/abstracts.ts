import { type AbstractClientService } from '@domains/client';
import { type IMigratorServiceOptions, type MigrationCommand } from '@domains/migrator';
import { type AbstractPathService } from '@domains/path';
import { type AbstractLoggerService } from '@libs/logger';

/**
 * Abstract base class for migrator services.
 *
 * Exposes the migration directions.
 */
export abstract class AbstractMigratorService<Client> {
  /**
   * Provides the database client migrations run against.
   */
  protected readonly clientService: AbstractClientService<Client>;
  /**
   * Logging service used for structured output and diagnostics.
   */
  protected readonly loggerService: AbstractLoggerService;
  /**
   * Resolves the filesystem paths.
   */
  protected readonly pathService: AbstractPathService;

  /**
   * Restricts instantiation to subclasses.
   *
   * @param options - Migrator service options.
   */
  protected constructor({ clientService, loggerService, pathService }: IMigratorServiceOptions<Client>) {
    this.clientService = clientService;
    this.loggerService = loggerService;
    this.pathService = pathService;
  }

  /**
   * Rolls back the most recently applied migration.
   *
   * @returns A promise that resolves once the migration is rolled back.
   */
  public abstract down(): Promise<void>;
  /**
   * Rolls back every applied migration.
   *
   * @returns A promise that resolves once the migrations are rolled back.
   */
  public abstract reset(): Promise<void>;
  /**
   * Applies every pending migration.
   *
   * @returns A promise that resolves once the migrations are applied.
   */
  public abstract up(): Promise<void>;
  /**
   * Runs the migrations in the given direction.
   *
   * @param command - The migration direction to run.
   *
   * @returns A promise that resolves once the run completes.
   */
  protected abstract migrate(command: MigrationCommand): Promise<void>;
}

import { type IMigratorServiceConfiguration, type MigrationCommand } from '@domains/migrator';

/**
 * Abstract base class for migrator services.
 *
 * Exposes the migration directions.
 */
export abstract class AbstractMigratorService {
  /**
   * Migrator configuration options.
   */
  protected readonly configuration: IMigratorServiceConfiguration;

  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   *
   * @param configuration - Migrator configuration options.
   */
  protected constructor(configuration: IMigratorServiceConfiguration) {
    this.configuration = configuration;
  }

  /**
   * Resolves the absolute path of the folder migration files are read from.
   *
   * @returns The absolute path migration files are read from.
   */
  protected abstract createFolderPath(): string;
  /**
   * Rolls back the most recently applied migration.
   *
   * @returns A promise that resolves once the migration is rolled back.
   */
  public abstract down(): Promise<void>;
  /**
   * Runs the migrations in the given direction.
   *
   * @param command - The migration direction to run.
   *
   * @returns A promise that resolves once the run completes.
   */
  protected abstract migrate(command: MigrationCommand): Promise<void>;
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
}

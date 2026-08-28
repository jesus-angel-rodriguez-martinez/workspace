import { AbstractMigratorService, type MigrationCommand, MigrationFailedError } from '@domains/migrator';
import { type ClientService } from '@infrastructures/client';
import { type IMigratorServiceOptions } from '@infrastructures/migrator';
import { FileMigrationProvider, Migrator, NO_MIGRATIONS } from 'kysely/migration';
import { promises } from 'node:fs';
import { join, resolve } from 'node:path';

export class MigratorService<Schema> extends AbstractMigratorService {
  protected readonly clientService: ClientService<Schema>;

  public constructor({ clientService, ...configuration }: IMigratorServiceOptions<Schema>) {
    super(configuration);
    this.clientService = clientService;
  }

  protected createFolderPath(): string {
    const directory = process.cwd();
    const folderPath = resolve(directory, 'database', 'migrations');
    return folderPath;
  }

  public down(): Promise<void> {
    return this.migrate('down');
  }

  protected async migrate(command: MigrationCommand): Promise<void> {
    const { loggerService } = this.configuration;

    const migrationFolder = this.createFolderPath();
    const db = this.clientService.createClient();
    const provider = new FileMigrationProvider({ fs: promises, migrationFolder, path: { join } });

    const migrator = new Migrator({
      db,
      provider
    });

    const { error, results = [] } =
      command === 'down'
        ? await migrator.migrateDown()
        : command === 'reset'
          ? await migrator.migrateTo(NO_MIGRATIONS)
          : await migrator.migrateToLatest();

    for (const result of results) {
      loggerService.info(
        `Migration [direction="${result.direction}", migration="${result.migrationName}", status="${result.status}"]`
      );
    }

    await db.destroy();

    if (error) {
      const failed = results.find(({ status }) => status === 'Error');
      throw new MigrationFailedError(failed?.migrationName ?? 'unknown', { cause: error });
    }
  }

  public reset(): Promise<void> {
    return this.migrate('reset');
  }

  public up(): Promise<void> {
    return this.migrate('up');
  }
}

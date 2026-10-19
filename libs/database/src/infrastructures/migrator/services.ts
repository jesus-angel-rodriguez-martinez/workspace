import {
  AbstractMigratorService,
  type IMigratorServiceOptions,
  type MigrationCommand,
  MigrationFailedError
} from '@domains/migrator';
import { type Kysely } from 'kysely';
import { FileMigrationProvider, Migrator, NO_MIGRATIONS } from 'kysely/migration';
import { promises } from 'node:fs';
import { join } from 'node:path';

export class MigratorService<Schema> extends AbstractMigratorService<Kysely<Schema>> {
  public constructor(options: IMigratorServiceOptions<Kysely<Schema>>) {
    super(options);
  }

  public down(): Promise<void> {
    return this.migrate('down');
  }

  public reset(): Promise<void> {
    return this.migrate('reset');
  }

  public up(): Promise<void> {
    return this.migrate('up');
  }

  protected async migrate(command: MigrationCommand): Promise<void> {
    const migrationFolder = this.pathService.resolveMigrationFolder();
    const db = this.clientService.getClient();

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
      this.loggerService.info(
        `Migration [direction="${result.direction}", migration="${result.migrationName}", status="${result.status}"]`
      );
    }

    await db.destroy();

    if (error) {
      const failed = results.find(({ status }) => status === 'Error');
      throw new MigrationFailedError(failed?.migrationName ?? 'unknown', { cause: error });
    }
  }
}

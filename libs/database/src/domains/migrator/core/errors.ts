import { type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when a migration fails to run.
 */
export class MigrationFailedError extends KernelError {
  public readonly code = 'MIGRATOR.MIGRATION_FAILED';
  public readonly title = 'Migration failed';

  /**
   * @param name - The name of the migration that failed.
   * @param options - Optional error configuration options.
   */
  constructor(name: string, options: IKernelErrorOptions = {}) {
    super(`Migration '${name}' failed to run.`, options);
  }
}

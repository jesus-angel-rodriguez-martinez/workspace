import { type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when a migration fails to run.
 */
export class MigrationFailedError extends KernelError {
  /**
   * @param name - The name of the migration that failed.
   * @param options - Optional error configuration options.
   */
  constructor(name: string, options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'DATABASE.MIGRATION_FAILED',
      detail: `Migration '${name}' failed to run.`,
      title: 'Migration failed'
    });
  }
}

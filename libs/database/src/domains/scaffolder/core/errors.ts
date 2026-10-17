import { type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when a migration is scaffolded with an invalid name.
 */
export class InvalidMigrationNameError extends KernelError {
  public readonly code = 'SCAFFOLDER.INVALID_MIGRATION_NAME';
  public readonly title = 'Invalid migration name';

  /**
   * @param name - The invalid migration name.
   * @param options - Optional error configuration options.
   */
  constructor(name: string, options: IKernelErrorOptions = {}) {
    super(
      `Migration name '${name}' may only contain lowercase letters, digits, and single hyphens between them.`,
      options
    );
  }
}

/**
 * Error thrown when a migration is scaffolded without a name.
 */
export class MissingMigrationNameError extends KernelError {
  public readonly code = 'SCAFFOLDER.MISSING_MIGRATION_NAME';
  public readonly title = 'Missing migration name';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super('A migration name is required to scaffold a new migration.', options);
  }
}

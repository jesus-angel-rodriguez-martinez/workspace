import { type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when a migration is scaffolded with an invalid name.
 */
export class InvalidMigrationNameError extends KernelError {
  /**
   * @param name - The invalid migration name.
   * @param options - Optional error configuration options.
   */
  constructor(name: string, options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'DATABASE.INVALID_MIGRATION_NAME',
      detail: `Migration name '${name}' may only contain lowercase letters, digits, and hyphens.`,
      title: 'Invalid migration name'
    });
  }
}

/**
 * Error thrown when a migration is scaffolded without a name.
 */
export class MissingMigrationNameError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'DATABASE.MISSING_MIGRATION_NAME',
      detail: 'A migration name is required to scaffold a new migration.',
      title: 'Missing migration name'
    });
  }
}

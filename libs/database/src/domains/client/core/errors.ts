import { AggregateKernelError, type IKernelError, type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when one or more client configuration validation errors are found.
 */
export class AggregateClientConfigurationError extends AggregateKernelError {
  public readonly code = 'CLIENT.INVALID_CONFIGURATION';
  public readonly title = 'Invalid client configuration';

  /**
   * @param errors - The collection of configuration errors.
   * @param options - Optional error configuration options.
   */
  constructor(errors: IKernelError[], options: IKernelErrorOptions = {}) {
    super(errors, options);
  }
}

/**
 * Error thrown when the database name is missing.
 */
export class MissingClientDatabaseError extends KernelError {
  public readonly code = 'CLIENT.MISSING_DATABASE';
  public readonly title = 'Missing database';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super('The database name is required.', options);
  }
}

/**
 * Error thrown when the database host is missing.
 */
export class MissingClientHostError extends KernelError {
  public readonly code = 'CLIENT.MISSING_HOST';
  public readonly title = 'Missing host';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super('The database host is required.', options);
  }
}

/**
 * Error thrown when the database password is missing.
 */
export class MissingClientPasswordError extends KernelError {
  public readonly code = 'CLIENT.MISSING_PASSWORD';
  public readonly title = 'Missing password';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super('The database password is required.', options);
  }
}

/**
 * Error thrown when the database port is missing.
 */
export class MissingClientPortError extends KernelError {
  public readonly code = 'CLIENT.MISSING_PORT';
  public readonly title = 'Missing port';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super('The database port is required.', options);
  }
}

/**
 * Error thrown when the database user is missing.
 */
export class MissingClientUserError extends KernelError {
  public readonly code = 'CLIENT.MISSING_USER';
  public readonly title = 'Missing user';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super('The database user is required.', options);
  }
}

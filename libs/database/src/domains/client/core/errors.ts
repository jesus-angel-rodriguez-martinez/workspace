import { AggregateKernelError, type IKernelError, type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when one or more client configuration validation errors are found.
 */
export class AggregateClientConfigurationError extends AggregateKernelError {
  /**
   * @param errors - The collection of configuration errors.
   * @param options - Optional error configuration options.
   */
  constructor(errors: IKernelError[], options: IKernelErrorOptions = {}) {
    super(errors, {
      cause: options.cause,
      code: 'CLIENT.INVALID_CONFIGURATION',
      title: 'Invalid client configuration'
    });
  }
}

/**
 * Error thrown when the database name is missing.
 */
export class MissingClientDatabaseError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CLIENT.MISSING_DATABASE',
      detail: 'The database name is required.',
      title: 'Missing database'
    });
  }
}

/**
 * Error thrown when the database host is missing.
 */
export class MissingClientHostError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CLIENT.MISSING_HOST',
      detail: 'The database host is required.',
      title: 'Missing host'
    });
  }
}

/**
 * Error thrown when the database password is missing.
 */
export class MissingClientPasswordError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CLIENT.MISSING_PASSWORD',
      detail: 'The database password is required.',
      title: 'Missing password'
    });
  }
}

/**
 * Error thrown when the database port is missing.
 */
export class MissingClientPortError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CLIENT.MISSING_PORT',
      detail: 'The database port is required.',
      title: 'Missing port'
    });
  }
}

/**
 * Error thrown when the database user is missing.
 */
export class MissingClientUserError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CLIENT.MISSING_USER',
      detail: 'The database user is required.',
      title: 'Missing user'
    });
  }
}

import { type IKernelError, type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when one or more configuration validation errors are found.
 */
export class AggregateConfigurationError extends KernelError {
  /**
   * @param errors - The collection of configuration errors.
   * @param options - Optional error configuration options.
   */
  constructor(errors: IKernelError[], options: IKernelErrorOptions = {}) {
    const count = errors.length;
    const details = errors.map(({ code, detail }) => `- [${code}] ${detail}`).join('\n');
    const isSingular = count === 1;
    super({
      cause: options.cause,
      code: 'CONFIGURATION.INVALID',
      detail: `Found ${count} configuration ${isSingular ? 'error' : 'errors'}:\n${details}`,
      title: 'Invalid configuration'
    });
  }
}

/**
 * Error thrown when the database name is missing.
 */
export class MissingDatabaseError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'DATABASE.MISSING_DATABASE',
      detail: 'The database name is required.',
      title: 'Missing database'
    });
  }
}

/**
 * Error thrown when the database host is missing.
 */
export class MissingHostError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'DATABASE.MISSING_HOST',
      detail: 'The database host is required.',
      title: 'Missing host'
    });
  }
}

/**
 * Error thrown when the database password is missing.
 */
export class MissingPasswordError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'DATABASE.MISSING_PASSWORD',
      detail: 'The database password is required.',
      title: 'Missing password'
    });
  }
}

/**
 * Error thrown when the database port is missing.
 */
export class MissingPortError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'DATABASE.MISSING_PORT',
      detail: 'The database port is required.',
      title: 'Missing port'
    });
  }
}

/**
 * Error thrown when the database user is missing.
 */
export class MissingUserError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'DATABASE.MISSING_USER',
      detail: 'The database user is required.',
      title: 'Missing user'
    });
  }
}

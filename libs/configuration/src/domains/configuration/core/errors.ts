import { AggregateKernelError, type IKernelError, type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when one or more configuration validation errors are found.
 */
export class AggregateConfigurationError extends AggregateKernelError {
  public readonly code = 'CONFIGURATION.INVALID_CONFIGURATION';
  public readonly title = 'Invalid configuration';

  /**
   * @param errors - The collection of configuration errors.
   * @param options - Optional error configuration options.
   */
  constructor(errors: IKernelError[], options: IKernelErrorOptions = {}) {
    super(errors, options);
  }
}

/**
 * Error thrown when a configuration value is empty.
 */
export class EmptyConfigurationError extends KernelError {
  public readonly code = 'CONFIGURATION.EMPTY';
  public readonly title = 'Empty configuration';

  /**
   * @param key - The configuration key with empty value.
   * @param options - Optional error configuration options.
   */
  constructor(key: string, options: IKernelErrorOptions = {}) {
    super(`Configuration key '${key}' cannot be empty.`, options);
  }
}

/**
 * Error thrown when a configuration value expected to be a boolean is invalid.
 */
export class InvalidBooleanConfigurationError extends KernelError {
  public readonly code = 'CONFIGURATION.INVALID_BOOLEAN';
  public readonly title = 'Invalid boolean configuration';

  /**
   * @param key - The configuration key with invalid boolean value.
   * @param options - Optional error configuration options.
   */
  constructor(key: string, options: IKernelErrorOptions = {}) {
    super(`Invalid boolean value for configuration key '${key}'.`, options);
  }
}

/**
 * Error thrown when a configuration value expected to be a number is invalid.
 */
export class InvalidNumberConfigurationError extends KernelError {
  public readonly code = 'CONFIGURATION.INVALID_NUMBER';
  public readonly title = 'Invalid number configuration';

  /**
   * @param key - The configuration key with invalid number value.
   * @param options - Optional error configuration options.
   */
  constructor(key: string, options: IKernelErrorOptions = {}) {
    super(`Invalid number value for configuration key '${key}'.`, options);
  }
}

/**
 * Error thrown when a required configuration value is missing from the environment.
 */
export class MissingConfigurationError extends KernelError {
  public readonly code = 'CONFIGURATION.MISSING';
  public readonly title = 'Missing configuration';

  /**
   * @param configuration - The name of the missing configuration variable.
   * @param options - Optional error configuration options.
   */
  constructor(configuration: string, options: IKernelErrorOptions = {}) {
    super(`Missing required configuration: '${configuration}'.`, options);
  }
}

/**
 * Error thrown when the configuration value type is unsupported.
 */
export class UnsupportedPrimitiveError extends KernelError {
  public readonly code = 'CONFIGURATION.UNSUPPORTED_PRIMITIVE';
  public readonly title = 'Unsupported configuration primitive';

  /**
   * @param key - The configuration key with unsupported primitive type.
   * @param primitive - The unsupported primitive type.
   * @param options - Optional error configuration options.
   */
  constructor(key: string, primitive: string, options: IKernelErrorOptions = {}) {
    super(`Unsupported primitive type '${primitive}' for configuration key '${key}'.`, options);
  }
}

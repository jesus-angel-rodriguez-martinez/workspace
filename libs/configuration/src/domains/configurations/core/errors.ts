import { CoreError, type ICoreError, type ICoreErrorOptions } from '@libs/core';

/**
 * Error thrown when one or more configuration validation errors are found.
 */
export class AggregateConfigurationError extends CoreError {
  /**
   * @param errors - The collection of configuration errors.
   * @param options - Optional error configuration options.
   */
  constructor(errors: ICoreError[], options: ICoreErrorOptions = {}) {
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
 * Error thrown when a configuration value is empty.
 */
export class EmptyConfigurationError extends CoreError {
  /**
   * @param key - The configuration key with empty value.
   * @param options - Optional error configuration options.
   */
  constructor(key: string, options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CONFIGURATION.EMPTY',
      detail: `Configuration key '${key}' cannot be empty.`,
      title: 'Empty configuration'
    });
  }
}

/**
 * Error thrown when a configuration value expected to be a boolean is invalid.
 */
export class InvalidBooleanConfigurationError extends CoreError {
  /**
   * @param key - The configuration key with invalid boolean value.
   * @param options - Optional error configuration options.
   */
  constructor(key: string, options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CONFIGURATION.INVALID_BOOLEAN',
      detail: `Invalid boolean value for configuration key '${key}'.`,
      title: 'Invalid boolean configuration'
    });
  }
}

/**
 * Error thrown when a configuration value expected to be a number is invalid.
 */
export class InvalidNumberConfigurationError extends CoreError {
  /**
   * @param key - The configuration key with invalid number value.
   * @param options - Optional error configuration options.
   */
  constructor(key: string, options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CONFIGURATION.INVALID_NUMBER',
      detail: `Invalid number value for configuration key '${key}'.`,
      title: 'Invalid number configuration'
    });
  }
}

/**
 * Error thrown when a required configuration value is missing from the environment.
 */
export class MissingConfigurationError extends CoreError {
  /**
   * @param configuration - The name of the missing configuration variable.
   * @param options - Optional error configuration options.
   */
  constructor(configuration: string, options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CONFIGURATION.MISSING',
      detail: `Missing required configuration: '${configuration}'.`,
      title: 'Missing configuration'
    });
  }
}

/**
 * Error thrown when the configuration value type is unsupported.
 */
export class UnsupportedPrimitiveError extends CoreError {
  /**
   * @param key - The configuration key with unsupported primitive type.
   * @param primitive - The unsupported primitive type.
   * @param options - Optional error configuration options.
   */
  constructor(key: string, primitive: string, options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CONFIGURATION.UNSUPPORTED_PRIMITIVE',
      detail: `Unsupported primitive type '${primitive}' for configuration key '${key}'.`,
      title: 'Unsupported configuration primitive'
    });
  }
}

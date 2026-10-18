import { CRYPTOGRAPHY_RULES } from '@domains/cryptography';
import { AggregateKernelError, type IKernelError, type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when one or more cryptography configuration validation errors are found.
 */
export class AggregateCryptographyConfigurationError extends AggregateKernelError {
  public readonly code = 'CRYPTOGRAPHY.INVALID_CONFIGURATION';
  public readonly title = 'Invalid cryptography configuration';

  /**
   * @param errors - The collection of configuration errors.
   * @param options - Optional error configuration options.
   */
  constructor(errors: IKernelError[], options: IKernelErrorOptions = {}) {
    super(errors, options);
  }
}

/**
 * Error thrown when the configured key length differs from the output length of the digest.
 */
export class InvalidCryptographyKeyLengthError extends KernelError {
  public readonly code = 'CRYPTOGRAPHY.INVALID_KEY_LENGTH';
  public readonly title = 'Invalid cryptography key length';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super(`The cryptography key length must be '${CRYPTOGRAPHY_RULES.key.LENGTH}' bytes.`, options);
  }
}

/**
 * Error thrown when the configured number of iterations is below its minimum security requirement.
 */
export class WeakCryptographyIterationsError extends KernelError {
  public readonly code = 'CRYPTOGRAPHY.WEAK_ITERATIONS';
  public readonly title = 'Weak cryptography iterations';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super(
      `The cryptography iterations must be at least '${CRYPTOGRAPHY_RULES.iterations.MIN_COUNT}'.`,
      options
    );
  }
}

/**
 * Error thrown when the configured salt length is below its minimum security requirement.
 */
export class WeakCryptographySaltLengthError extends KernelError {
  public readonly code = 'CRYPTOGRAPHY.WEAK_SALT_LENGTH';
  public readonly title = 'Weak cryptography salt length';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super(
      `The cryptography salt length must be at least '${CRYPTOGRAPHY_RULES.salt.MIN_LENGTH}' bytes.`,
      options
    );
  }
}

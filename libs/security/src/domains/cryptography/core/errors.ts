import { CRYPTOGRAPHY_RULES } from '@domains/cryptography';
import { AggregateKernelError, type IKernelError, type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when one or more cryptography configuration validation errors are found.
 */
export class AggregateCryptographyConfigurationError extends AggregateKernelError {
  /**
   * @param errors - The collection of configuration errors.
   * @param options - Optional error configuration options.
   */
  constructor(errors: IKernelError[], options: IKernelErrorOptions = {}) {
    super(errors, {
      cause: options.cause,
      code: 'CRYPTOGRAPHY.INVALID_CONFIGURATION',
      title: 'Invalid cryptography configuration'
    });
  }
}

/**
 * Error thrown when the configured number of iterations is below its minimum security requirement.
 */
export class WeakCryptographyIterationsError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CRYPTOGRAPHY.WEAK_ITERATIONS',
      detail: `The cryptography iterations must be at least '${CRYPTOGRAPHY_RULES.iterations.MIN}'.`,
      title: 'Weak cryptography iterations'
    });
  }
}

/**
 * Error thrown when the configured key length is below its minimum security requirement.
 */
export class WeakCryptographyKeyLengthError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CRYPTOGRAPHY.WEAK_KEY_LENGTH',
      detail: `The cryptography key length must be at least '${CRYPTOGRAPHY_RULES.key.MIN_LENGTH}' bytes.`,
      title: 'Weak cryptography key length'
    });
  }
}

/**
 * Error thrown when the configured salt length is below its minimum security requirement.
 */
export class WeakCryptographySaltLengthError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CRYPTOGRAPHY.WEAK_SALT_LENGTH',
      detail: `The cryptography salt length must be at least '${CRYPTOGRAPHY_RULES.salt.MIN_LENGTH}' bytes.`,
      title: 'Weak cryptography salt length'
    });
  }
}

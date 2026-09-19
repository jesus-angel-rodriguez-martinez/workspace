import { TOKEN_RULES } from '@domains/token';
import { AggregateKernelError, type IKernelError, type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when one or more token configuration validation errors are found.
 */
export class AggregateTokenConfigurationError extends AggregateKernelError {
  /**
   * @param errors - The collection of configuration errors.
   * @param options - Optional error configuration options.
   */
  constructor(errors: IKernelError[], options: IKernelErrorOptions = {}) {
    super(errors, {
      cause: options.cause,
      code: 'TOKEN.INVALID_CONFIGURATION',
      title: 'Invalid token configuration'
    });
  }
}

/**
 * Error thrown when an authentication token has expired.
 */
export class TokenExpiryError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'TOKEN.EXPIRY',
      detail: 'The authentication token has expired.',
      title: 'Token expiry'
    });
  }
}

/**
 * Error thrown when an authentication token cannot be issued.
 */
export class TokenIssuanceError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'TOKEN.ISSUANCE',
      detail: 'The authentication token could not be issued.',
      title: 'Token issuance failed'
    });
  }
}

/**
 * Error thrown when an authentication token is invalid.
 */
export class TokenValidationError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'TOKEN.VALIDATION',
      detail: 'The authentication token is invalid.',
      title: 'Token validation failed'
    });
  }
}

/**
 * Error thrown when the configured secret is below its minimum security requirement.
 */
export class WeakTokenSecretError extends KernelError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'TOKEN.WEAK_SECRET',
      detail: `The token secret must be at least '${TOKEN_RULES.secret.MIN_LENGTH}' characters.`,
      title: 'Weak token secret'
    });
  }
}

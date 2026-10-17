import { TOKEN_RULES } from '@domains/token';
import { AggregateKernelError, type IKernelError, type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when one or more token configuration validation errors are found.
 */
export class AggregateTokenConfigurationError extends AggregateKernelError {
  public readonly code = 'TOKEN.INVALID_CONFIGURATION';
  public readonly title = 'Invalid token configuration';

  /**
   * @param errors - The collection of configuration errors.
   * @param options - Optional error configuration options.
   */
  constructor(errors: IKernelError[], options: IKernelErrorOptions = {}) {
    super(errors, options);
  }
}

/**
 * Error thrown when an authentication token has expired.
 */
export class TokenExpiryError extends KernelError {
  public readonly code = 'TOKEN.EXPIRY';
  public readonly title = 'Token expiry';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super('The authentication token has expired.', options);
  }
}

/**
 * Error thrown when an authentication token cannot be issued.
 */
export class TokenIssuanceError extends KernelError {
  public readonly code = 'TOKEN.ISSUANCE';
  public readonly title = 'Token issuance failed';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super('The authentication token could not be issued.', options);
  }
}

/**
 * Error thrown when an authentication token is invalid.
 */
export class TokenValidationError extends KernelError {
  public readonly code = 'TOKEN.VALIDATION';
  public readonly title = 'Token validation failed';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super('The authentication token is invalid.', options);
  }
}

/**
 * Error thrown when the configured secret is below its minimum security requirement.
 */
export class WeakTokenSecretError extends KernelError {
  public readonly code = 'TOKEN.WEAK_SECRET';
  public readonly title = 'Weak token secret';

  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: IKernelErrorOptions = {}) {
    super(`The token secret must be at least '${TOKEN_RULES.secret.MIN_LENGTH}' characters.`, options);
  }
}

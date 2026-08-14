import { type IKernelErrorOptions, KernelError } from '@libs/kernel';

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
      code: 'SECURITY.TOKEN_EXPIRY',
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
      code: 'SECURITY.TOKEN_ISSUANCE',
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
      code: 'SECURITY.TOKEN_VALIDATION',
      detail: 'The authentication token is invalid.',
      title: 'Token validation failed'
    });
  }
}

/**
 * Error thrown when a token configuration value is below its minimum
 * security requirement.
 */
export class WeakTokenConfigurationError extends KernelError {
  /**
   * @param key - The token configuration key that is too weak.
   * @param minimum - The minimum accepted value for the configuration key.
   * @param options - Optional error configuration options.
   */
  constructor(key: string, minimum: number, options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'SECURITY.WEAK_TOKEN_CONFIGURATION',
      detail: `Token configuration '${key}' must be at least ${minimum}.`,
      title: 'Weak token configuration'
    });
  }
}

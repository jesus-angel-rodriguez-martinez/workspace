import { CoreError, type ICoreErrorOptions } from '@libs/core';

/**
 * Error thrown when an authentication token has expired.
 */
export class TokenExpiryError extends CoreError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: ICoreErrorOptions = {}) {
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
export class TokenIssuanceError extends CoreError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: ICoreErrorOptions = {}) {
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
export class TokenValidationError extends CoreError {
  /**
   * @param options - Optional error configuration options.
   */
  constructor(options: ICoreErrorOptions = {}) {
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
export class WeakTokenConfigurationError extends CoreError {
  /**
   * @param key - The token configuration key that is too weak.
   * @param minimum - The minimum accepted value for the configuration key.
   * @param options - Optional error configuration options.
   */
  constructor(key: string, minimum: number, options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'SECURITY.WEAK_TOKEN_CONFIGURATION',
      detail: `Token configuration '${key}' must be at least ${minimum}.`,
      title: 'Weak token configuration'
    });
  }
}

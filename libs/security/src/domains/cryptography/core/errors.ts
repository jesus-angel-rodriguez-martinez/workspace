import { CoreError, type ICoreErrorOptions } from '@libs/core';

/**
 * Error thrown when a cryptography configuration value is below its minimum
 * security requirement.
 */
export class WeakCryptographyConfigurationError extends CoreError {
  /**
   * @param key - The cryptography configuration key that is too weak.
   * @param minimum - The minimum accepted value for the configuration key.
   * @param options - Optional error configuration options.
   */
  constructor(key: string, minimum: number, options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'SECURITY.WEAK_CRYPTOGRAPHY_CONFIGURATION',
      detail: `Cryptography configuration '${key}' must be at least ${minimum}.`,
      title: 'Weak cryptography configuration'
    });
  }
}

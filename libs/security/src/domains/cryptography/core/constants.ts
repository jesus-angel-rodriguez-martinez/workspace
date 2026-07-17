/**
 * Minimum security rules for the cryptography configuration.
 */
export const CRYPTOGRAPHY_RULES = {
  iterations: {
    /**
     * Minimum number of iterations considered secure.
     */
    MIN: 100_000
  },
  key: {
    /**
     * Minimum length in bytes of a derived key.
     */
    MIN_LENGTH: 32
  },
  salt: {
    /**
     * Minimum length in bytes of a cryptographic salt.
     */
    MIN_LENGTH: 16
  }
} as const;

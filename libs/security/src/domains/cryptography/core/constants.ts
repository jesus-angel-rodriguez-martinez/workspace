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
  keyLength: {
    /**
     * Minimum length in bytes of a derived key.
     */
    MIN: 32
  },
  saltLength: {
    /**
     * Minimum length in bytes of a cryptographic salt.
     */
    MIN: 16
  }
} as const;

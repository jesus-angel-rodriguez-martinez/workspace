/**
 * Security rules for the cryptography configuration.
 */
export const CRYPTOGRAPHY_RULES = {
  iterations: {
    /**
     * Minimum number of iterations considered secure.
     */
    MIN_COUNT: 600_000
  },
  key: {
    /**
     * Length in bytes of a derived key.
     */
    LENGTH: 32
  },
  salt: {
    /**
     * Minimum length in bytes of a cryptographic salt.
     */
    MIN_LENGTH: 16
  }
} as const;

/**
 * Minimum security rules for the token configuration.
 */
export const TOKEN_RULES = {
  secret: {
    /**
     * Minimum length in characters of a signing secret.
     */
    MIN_LENGTH: 32
  }
} as const;

/**
 * Minimum security rules for the token configuration.
 */
export const TOKEN_RULES = {
  expiresIn: {
    /**
     * Minimum lifetime in seconds of an issued token.
     */
    MIN_SECONDS: 60
  },
  secret: {
    /**
     * Minimum length in characters of a signing secret.
     */
    MIN_LENGTH: 32
  }
} as const;

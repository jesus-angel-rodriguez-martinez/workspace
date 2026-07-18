/**
 * Validation rules for user-related fields.
 */
export const USER_RULES = {
  name: {
    /**
     * Maximum number of characters allowed in a name.
     */
    MAX_LENGTH: 100,
    /**
     * Minimum number of characters required for a name.
     */
    MIN_LENGTH: 3,
    /**
     * Regex patterns for validating name rules.
     */
    REGEX_PATTERNS: {
      /**
       * Regex pattern to allow only letters, spaces, and apostrophes.
       */
      ALLOWED_CHARACTERS: /^[\p{L} ']+$/u
    }
  },
  password: {
    /**
     * Maximum number of characters allowed in a password.
     */
    MAX_LENGTH: 120,
    /**
     * Minimum number of characters required for a password.
     */
    MIN_LENGTH: 8,
    /**
     * Regex patterns for validating password rules.
     */
    REGEX_PATTERNS: {
      /**
       * Ensures at least one lowercase letter is present.
       */
      HAS_LOWERCASE: /[a-z]/,
      /**
       * Ensures at least one numeric digit is present.
       */
      HAS_NUMBER: /[0-9]/,
      /**
       * Ensures at least one uppercase letter is present.
       */
      HAS_UPPERCASE: /[A-Z]/
    }
  },
  username: {
    /**
     * Maximum number of characters allowed in a username.
     */
    MAX_LENGTH: 30,
    /**
     * Minimum number of characters required for a username.
     */
    MIN_LENGTH: 3,
    /**
     * Regex patterns for validating username rules.
     */
    REGEX_PATTERNS: {
      /**
       * Allows only letters, numbers, and hyphens.
       */
      ALLOWED_CHARACTERS: /^[a-zA-Z0-9-]+$/
    }
  }
} as const;

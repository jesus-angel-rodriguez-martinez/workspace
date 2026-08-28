/**
 * Rules for scaffolding migration files.
 */
export const SCAFFOLDER_RULES = {
  fileName: {
    /**
     * Regex patterns for validating the migration file name.
     */
    REGEX_PATTERNS: {
      /**
       * Regex pattern to allow only lowercase letters, digits, and hyphens.
       */
      ALLOWED_CHARACTERS: /^[a-z0-9-]+$/
    }
  },
  timestamp: {
    /**
     * Regex patterns for building the migration timestamp.
     */
    REGEX_PATTERNS: {
      /**
       * Regex pattern to match characters that are not digits.
       */
      NON_DIGITS: /\D/g
    }
  }
} as const;

/**
 * Rules for configuring the client.
 */
export const CLIENT_RULES = {
  certificateFileName: {
    /**
     * Regex patterns for validating the certificate file name.
     */
    REGEX_PATTERNS: {
      /**
       * Regex pattern to allow only letters, digits, hyphens and underscores, separated by single dots.
       */
      ALLOWED_CHARACTERS: /^[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*$/
    }
  }
} as const;

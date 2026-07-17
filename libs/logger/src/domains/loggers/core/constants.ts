/**
 * Rules for formatting logger names.
 */
export const LOGGER_RULES = {
  packageName: {
    /**
     * Number of path segments before the `src`/`dist` boundary.
     */
    DEPTH: 2
  }
} as const;

/**
 * Rules for connecting the client.
 */
export const CLIENT_RULES = {
  connectionTimeout: {
    /**
     * Maximum time in milliseconds to wait for a connection.
     */
    MAX_MILLISECONDS: 5_000
  }
} as const;

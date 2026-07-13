/**
 * Extracts the valid keys from a given configuration.
 */
export type ConfigurationKey<C extends Configuration> = keyof C & string;

/**
 * Defines the expected structure of a configuration object.
 */
export type Configuration = Record<string, ConfigurationValue>;

/**
 * Defines the primitive value types supported.
 */
export type ConfigurationValue = 'boolean' | 'number' | 'string';

/**
 * Resolves a configuration to its corresponding native types.
 */
export type ResolvedConfiguration<C extends Configuration> = {
  [K in keyof C]: C[K] extends 'boolean'
    ? boolean
    : C[K] extends 'number'
      ? number
      : C[K] extends 'string'
        ? string
        : never;
};

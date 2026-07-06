/**
 * Extracts the valid keys from a given configuration schema.
 */
export type ConfigurationKey<S extends ConfigurationSchema> = keyof S & string;

/**
 * Defines the expected structure of a configuration object.
 */
export type ConfigurationSchema = Record<string, ConfigurationValue>;

/**
 * Defines the primitive value types supported.
 */
export type ConfigurationValue = 'boolean' | 'number' | 'string';

/**
 * Resolves a configuration schema to its corresponding native types.
 */
export type ResolvedConfigurationSchema<S extends ConfigurationSchema> = {
  [K in keyof S]: S[K] extends 'boolean'
    ? boolean
    : S[K] extends 'number'
      ? number
      : S[K] extends 'string'
        ? string
        : never;
};

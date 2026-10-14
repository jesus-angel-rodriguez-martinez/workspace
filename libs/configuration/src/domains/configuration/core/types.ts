/**
 * Defines the expected structure of a configuration object.
 */
export type Configuration = Record<string, IConfigurationValue>;

/**
 * Extracts the valid keys from a given configuration.
 */
export type ConfigurationKey<C extends Configuration> = keyof C & string;

/**
 * Defines the primitive types a configuration value can be parsed to.
 */
export type ConfigurationType = 'boolean' | 'number' | 'string';

/**
 * Resolves each configuration value to its native type.
 */
export type ResolvedConfiguration<C extends Configuration> = {
  readonly [K in keyof C]: C[K] extends { readonly required: true }
    ? ResolvedType<C[K]['type']>
    : ResolvedType<C[K]['type']> | undefined;
};

/**
 * Resolves a primitive type to its native type.
 */
type ResolvedType<T extends ConfigurationType> = T extends 'boolean'
  ? boolean
  : T extends 'number'
    ? number
    : T extends 'string'
      ? string
      : never;

/**
 * Defines how a single configuration value is parsed.
 */
export interface IConfigurationValue {
  /**
   * Defines whether the value must be defined in the environment.
   */
  readonly required: boolean;
  /**
   * Defines the primitive type the value is parsed to.
   */
  readonly type: ConfigurationType;
}

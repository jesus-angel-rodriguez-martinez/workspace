import {
  type ConfigurationKey,
  type ConfigurationSchema,
  type ResolvedConfigurationSchema
} from '@domains/configurations';

/**
 * Abstract base class for configuration services.
 *
 * Provides a strongly-typed interface for accessing already-defined environment variables.
 */
export abstract class AbstractConfigurationService {
  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   */
  protected constructor() {}

  /**
   * Parses a boolean configuration value.
   *
   * @param key - The configuration key being parsed.
   * @param value - The raw string value retrieved from the environment.
   *
   * @returns The parsed boolean value (`true` or `false`).
   */
  protected abstract parseBoolean(key: string, value: string): boolean;
  /**
   * Parses a numeric configuration value.
   *
   * @param key - The configuration key being parsed.
   * @param value - The raw string value retrieved from the environment.
   *
   * @returns The parsed finite number.
   */
  protected abstract parseNumber(key: string, value: string): number;
  /**
   * Parses a string configuration value.
   *
   * @param key - The configuration key being parsed.
   * @param value - The raw string value retrieved from the environment.
   *
   * @returns The parsed string value.
   */
  protected abstract parseString(key: string, value: string): string;
  /**
   * Retrieves and parses a configuration value based on its expected type.
   *
   * The value is returned as the native JavaScript type (`string`, `number`, or `boolean`)
   * corresponding to the provided primitive type in the configuration schema.
   *
   * @param key - The configuration key to retrieve.
   * @param value - The expected primitive type of the configuration key.
   *
   * @returns The parsed configuration value with the appropriate native type.
   */
  protected abstract get<S extends ConfigurationSchema, K extends ConfigurationKey<S>>(
    key: K,
    value: S[K]
  ): ResolvedConfigurationSchema<S>[K];
  /**
   * Retrieves and parses all configuration values defined in the given schema.
   *
   * Each value is parsed according to its declared type in the configuration schema
   * and returned as a fully typed object.
   *
   * @param s - The configuration schema defining keys and their expected primitive types.
   *
   * @returns An object containing all configuration entries with correctly parsed types.
   */
  public abstract getAll<S extends ConfigurationSchema>(s: S): ResolvedConfigurationSchema<S>;
}

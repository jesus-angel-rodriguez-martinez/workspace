import {
  type Configuration,
  type ConfigurationKey,
  type ResolvedConfiguration
} from '@domains/configuration';

/**
 * Abstract base class for configuration services.
 *
 * Provides a strongly-typed interface for accessing already-defined environment variables.
 */
export abstract class AbstractConfigurationService<C extends Configuration> {
  /**
   * The resolved configuration, parsed once at construction time.
   */
  private readonly configuration: ResolvedConfiguration<C>;

  /**
   * Restricts instantiation to subclasses.
   *
   * @param configuration - The configuration defining the type of each key and whether it is required.
   */
  protected constructor(configuration: C) {
    const parsedConfiguration = this.parseAll(configuration);

    this.configuration = Object.freeze(parsedConfiguration);
  }

  /**
   * Returns a single resolved configuration value from the cached configuration.
   *
   * @param key - The configuration key to retrieve.
   *
   * @returns The parsed value for the given key, or `undefined` if `required` is `false` and it is missing.
   */
  public get<K extends ConfigurationKey<C>>(key: K): ResolvedConfiguration<C>[K] {
    return this.configuration[key];
  }
  /**
   * Returns the whole resolved configuration from the cached configuration.
   *
   * @returns An object containing all configuration entries with correctly parsed types.
   */
  public getAll(): ResolvedConfiguration<C> {
    return this.configuration;
  }
  /**
   * Reads and parses every value defined in the configuration.
   *
   * Each value is parsed according to its declared type in the configuration
   * and returned as a fully typed object.
   *
   * @param configuration - The configuration defining the type of each key and whether it is required.
   *
   * @returns An object containing all configuration entries with correctly parsed types.
   */
  protected abstract parseAll(configuration: C): ResolvedConfiguration<C>;
  /**
   * Parses a boolean configuration value.
   *
   * @param key - The configuration key being parsed.
   * @param rawValue - The raw string value retrieved from the environment.
   *
   * @returns The parsed boolean value (`true` or `false`).
   */
  protected abstract parseBoolean(key: string, rawValue: string): boolean;
  /**
   * Parses a numeric configuration value.
   *
   * @param key - The configuration key being parsed.
   * @param rawValue - The raw string value retrieved from the environment.
   *
   * @returns The parsed finite number.
   */
  protected abstract parseNumber(key: string, rawValue: string): number;
  /**
   * Reads and parses a single configuration value based on its expected type.
   *
   * The value is returned as the native JavaScript type (`string`, `number`, or `boolean`)
   * corresponding to the provided primitive type in the configuration, or as `undefined`
   * when `required` is `false`.
   *
   * @param key - The configuration key to read.
   * @param value - The definition of the configuration key (its type and whether it is required).
   *
   * @returns The parsed configuration value with the appropriate native type.
   */
  protected abstract parseOne<T extends Configuration, K extends ConfigurationKey<T>>(
    key: K,
    value: T[K]
  ): ResolvedConfiguration<T>[K];
  /**
   * Parses a string configuration value.
   *
   * @param key - The configuration key being parsed.
   * @param rawValue - The raw string value retrieved from the environment.
   *
   * @returns The parsed string value.
   */
  protected abstract parseString(key: string, rawValue: string): string;
}

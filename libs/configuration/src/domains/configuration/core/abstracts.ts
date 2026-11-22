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
   * and returned as a fully typed object. Every invalid or missing value is collected
   * and reported together.
   *
   * @param configuration - The configuration defining the type of each key and whether it is required.
   *
   * @returns An object containing all configuration entries with correctly parsed types.
   *
   * @throws {AggregateConfigurationError} When one or more values fail validation.
   */
  protected abstract parseAll(configuration: C): ResolvedConfiguration<C>;
}

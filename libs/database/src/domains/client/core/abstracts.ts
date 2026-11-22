import { type AbstractCertificateService } from '@domains/certificate';
import { type IClientServiceConfiguration, type IClientServiceOptions } from '@domains/client';

/**
 * Abstract base class for creating and verifying the database client.
 */
export abstract class AbstractClientService<Client> {
  /**
   * Provides the certificate for TLS connections.
   */
  protected readonly certificateService: AbstractCertificateService | undefined;
  /**
   * Client configuration options.
   */
  protected readonly configuration: IClientServiceConfiguration;

  /**
   * Restricts instantiation to subclasses.
   *
   * @param options - Client service options.
   */
  protected constructor({ certificateService, clientValidator, configuration }: IClientServiceOptions) {
    clientValidator.validate(configuration);

    this.certificateService = certificateService;
    this.configuration = Object.freeze({ ...configuration });
  }

  /**
   * Gets the client used to query the database.
   *
   * @returns The database client.
   */
  public abstract getClient(): Client;
  /**
   * Verifies that the client can reach the database.
   *
   * @returns A promise that resolves once the database answers.
   *
   * @throws {ClientConnectionError} When the database cannot be reached.
   */
  public abstract verifyConnection(): Promise<void>;
  /**
   * Creates the client used to query the database.
   *
   * @returns The database client.
   */
  protected abstract createClient(): Client;
  /**
   * Creates the connection string used to reach the database.
   *
   * The format is driver-specific and therefore provided by the infrastructure.
   *
   * @returns The connection string.
   */
  protected abstract createConnectionString(): string;
}

/**
 * Abstract base class for validating the database client configuration.
 */
export abstract class AbstractClientValidator {
  /**
   * Restricts instantiation to subclasses.
   */
  protected constructor() {}

  /**
   * Validates that the configuration provides every required connection value.
   *
   * @param configuration - Client configuration options to validate.
   *
   * @throws {AggregateClientConfigurationError} When one or more required connection values are missing.
   */
  public abstract validate(configuration: IClientServiceConfiguration): void;
}

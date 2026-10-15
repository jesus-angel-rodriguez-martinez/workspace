import { type AbstractCertificateService } from '@domains/certificate';
import { type IClientServiceConfiguration, type IClientServiceOptions } from '@domains/client';

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
   * Creates the client used to query the database.
   *
   * @returns The database client.
   */
  public abstract createClient(): Client;
  /**
   * Creates the connection string used to reach the database.
   *
   * The format is driver-specific and therefore provided by the infrastructure.
   *
   * @returns The connection string.
   */
  protected abstract createConnectionString(): string;
}

export abstract class AbstractClientValidator {
  /**
   * Restricts instantiation to subclasses.
   */
  protected constructor() {}

  /**
   * Validates that the configuration provides every required connection value.
   *
   * @param configuration - Client configuration options to validate.
   */
  public abstract validate(configuration: IClientServiceConfiguration): void;
}

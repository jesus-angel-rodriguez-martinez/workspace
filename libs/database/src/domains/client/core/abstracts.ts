import { type AbstractCertificateService } from '@domains/certificate';
import { type IClientServiceConfiguration, type IClientServiceOptions } from '@domains/client';

/**
 * Abstract base class for client services.
 *
 * Provides the connection configuration while leaving client construction to the infrastructure.
 */
export abstract class AbstractClientService {
  /**
   * Reads the certificate used to verify the database server, when TLS is enabled.
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

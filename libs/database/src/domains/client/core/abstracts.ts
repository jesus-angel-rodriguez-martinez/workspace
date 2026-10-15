import { type IClientServiceConfiguration } from '@domains/client';

/**
 * Abstract base class for client services.
 *
 * Provides the connection configuration while leaving client construction to the infrastructure.
 */
export abstract class AbstractClientService {
  /**
   * Client configuration options.
   */
  protected readonly configuration: IClientServiceConfiguration;

  /**
   * Restricts instantiation to subclasses.
   *
   * @param configuration - Client configuration options.
   */
  protected constructor(configuration: IClientServiceConfiguration) {
    this.validateConfiguration(configuration);

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
  /**
   * Reads the certificate authority used to verify the database server.
   *
   * @returns The certificate content, or `undefined` when no certificate is configured.
   */
  protected abstract readCertificate(): string | undefined;
  /**
   * Validates that the configuration provides every required connection value.
   *
   * @param configuration - Client configuration options to validate.
   */
  protected abstract validateConfiguration(configuration: IClientServiceConfiguration): void;
}

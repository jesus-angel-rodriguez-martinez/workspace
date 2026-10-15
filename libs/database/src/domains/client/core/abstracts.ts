import { type IClientServiceConfiguration, type IClientServiceOptions } from '@domains/client';
import { type AbstractPathService } from '@domains/path';

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
   * Resolves the filesystem paths.
   */
  protected readonly pathService: AbstractPathService;

  /**
   * Restricts instantiation to subclasses.
   *
   * @param options - Client service options.
   */
  protected constructor({ clientValidator, configuration, pathService }: IClientServiceOptions) {
    clientValidator.validate(configuration);

    this.configuration = Object.freeze({ ...configuration });
    this.pathService = pathService;
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

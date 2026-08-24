import { type IClientConfiguration } from './types';

/**
 * Abstract base class for client services.
 *
 * Provides the connection configuration while leaving client construction to the infrastructure.
 */
export abstract class AbstractClientService {
  /**
   * Client configuration options.
   */
  protected readonly configuration: IClientConfiguration;

  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   *
   * @param configuration - Client configuration options.
   */
  protected constructor(configuration: IClientConfiguration) {
    this.configuration = configuration;
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

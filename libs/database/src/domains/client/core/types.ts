import { type AbstractCertificateService } from '@domains/certificate';
import { type AbstractClientValidator } from '@domains/client';

export interface IClientServiceConfiguration {
  /**
   * The name of the database to connect to.
   */
  readonly database: string;
  /**
   * The host the database server runs on.
   */
  readonly host: string;
  /**
   * The password used to authenticate.
   */
  readonly password: string;
  /**
   * The port the database server listens on.
   */
  readonly port: number;
  /**
   * The user used to authenticate.
   */
  readonly user: string;
}

export interface IClientServiceOptions {
  /**
   * Provides the certificate for TLS connections.
   */
  readonly certificateService?: AbstractCertificateService | undefined;
  /**
   * Validates the client configuration.
   */
  readonly clientValidator: AbstractClientValidator;
  /**
   * Client configuration options.
   */
  readonly configuration: IClientServiceConfiguration;
}

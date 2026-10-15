import { type AbstractClientValidator } from '@domains/client';
import { type AbstractPathService } from '@domains/path';

export interface IClientServiceConfiguration {
  /**
   * The certificate file name used to verify the database server.
   */
  readonly certificateFileName?: string | undefined;
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
   * Validates the client configuration.
   */
  readonly clientValidator: AbstractClientValidator;
  /**
   * Client configuration options.
   */
  readonly configuration: IClientServiceConfiguration;
  /**
   * Resolves the filesystem paths.
   */
  readonly pathService: AbstractPathService;
}

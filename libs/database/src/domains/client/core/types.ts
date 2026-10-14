import { type AbstractPathService } from '@domains/path';

/**
 * Options to construct the client service.
 */
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
   * Resolves the filesystem paths.
   */
  readonly pathService: AbstractPathService;
  /**
   * The port the database server listens on.
   */
  readonly port: number;
  /**
   * The user used to authenticate.
   */
  readonly user: string;
}

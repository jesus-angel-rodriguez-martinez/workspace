/**
 * Options to construct the client service.
 */
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

/**
 * Options to construct the client service.
 */
export interface IClientServiceConfiguration {
  /**
   * The name of the database to connect to.
   */
  database: string;
  /**
   * The host the database server runs on.
   */
  host: string;
  /**
   * The password used to authenticate.
   */
  password: string;
  /**
   * The port the database server listens on.
   */
  port: number;
  /**
   * The user used to authenticate.
   */
  user: string;
}

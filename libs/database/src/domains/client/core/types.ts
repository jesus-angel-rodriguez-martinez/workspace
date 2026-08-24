/**
 * Options to build the database client.
 */
export interface IClientConfiguration {
  database: string;
  host: string;
  password: string;
  port: number;
  user: string;
}

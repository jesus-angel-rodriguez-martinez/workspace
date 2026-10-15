import { AbstractClientService, type IClientServiceOptions } from '@domains/client';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export class ClientService<Schema> extends AbstractClientService {
  public constructor(options: IClientServiceOptions) {
    super(options);
  }

  public createClient(): Kysely<Schema> {
    const connectionString = this.createConnectionString();
    const certificate = this.certificateService?.read();

    const ssl = certificate ? { ca: certificate, rejectUnauthorized: true } : undefined;
    const pool = new Pool({ connectionString, ssl });
    const dialect = new PostgresDialect({ pool });
    const plugins = [new CamelCasePlugin()];

    const client = new Kysely<Schema>({
      dialect,
      plugins
    });
    return client;
  }

  protected createConnectionString(): string {
    const { database, host, password, port, user } = this.configuration;

    const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;
    return connectionString;
  }
}

import { AbstractClientService, type IClientServiceOptions } from '@domains/client';
import { CamelCasePlugin, Kysely, type KyselyPlugin, PostgresDialect } from 'kysely';
import { type ConnectionOptions } from 'node:tls';
import { Pool } from 'pg';

export class ClientService<Schema> extends AbstractClientService<Kysely<Schema>> {
  public constructor(options: IClientServiceOptions) {
    super(options);
  }

  public createClient(): Kysely<Schema> {
    const connectionString = this.createConnectionString();
    const ssl = this.createSslOptions();
    const plugins = this.createPlugins();

    const pool = new Pool({ connectionString, ssl });
    const dialect = new PostgresDialect({ pool });

    const client = new Kysely<Schema>({
      dialect,
      plugins
    });
    return client;
  }

  protected createConnectionString(): string {
    const { database, host, password, port, user } = this.configuration;

    const formattedDatabase = encodeURIComponent(database);
    const formattedPassword = encodeURIComponent(password);
    const formattedUser = encodeURIComponent(user);

    const connectionString = `postgresql://${formattedUser}:${formattedPassword}@${host}:${port}/${formattedDatabase}`;
    return connectionString;
  }

  protected createPlugins(): KyselyPlugin[] {
    const plugins: KyselyPlugin[] = [new CamelCasePlugin()];
    return plugins;
  }

  protected createSslOptions(): ConnectionOptions | undefined {
    if (!this.certificateService) {
      return undefined;
    }

    const sslOptions: ConnectionOptions = {
      ca: this.certificateService.read(),
      rejectUnauthorized: true
    };
    return sslOptions;
  }
}

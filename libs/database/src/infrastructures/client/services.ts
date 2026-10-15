import { AbstractClientService, type IClientServiceOptions } from '@domains/client';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { readFileSync } from 'node:fs';
import { Pool } from 'pg';

export class ClientService<Schema> extends AbstractClientService {
  public constructor(options: IClientServiceOptions) {
    super(options);
  }

  public createClient(): Kysely<Schema> {
    const connectionString = this.createConnectionString();
    const certificate = this.readCertificate();

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

  protected readCertificate(): string | undefined {
    const { certificateFileName } = this.configuration;
    if (!certificateFileName) {
      return undefined;
    }

    const certificatePath = this.pathService.resolveCertificateFile(certificateFileName);

    const content = readFileSync(certificatePath, 'utf8');
    return content;
  }
}

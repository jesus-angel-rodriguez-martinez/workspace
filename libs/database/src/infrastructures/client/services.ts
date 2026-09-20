import {
  AbstractClientService,
  AggregateClientConfigurationError,
  type IClientServiceConfiguration,
  MissingClientDatabaseError,
  MissingClientHostError,
  MissingClientPasswordError,
  MissingClientPortError,
  MissingClientUserError
} from '@domains/client';
import { type IKernelError } from '@libs/kernel';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export class ClientService<Schema> extends AbstractClientService {
  public constructor(configuration: IClientServiceConfiguration) {
    super(configuration);
  }

  public createClient(): Kysely<Schema> {
    const connectionString = this.createConnectionString();

    const pool = new Pool({ connectionString });
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

  protected validateConfiguration(configuration: IClientServiceConfiguration): void {
    const { database, host, password, port, user } = configuration;

    const errors: IKernelError[] = [];

    if (!database) {
      errors.push(new MissingClientDatabaseError());
    }
    if (!host) {
      errors.push(new MissingClientHostError());
    }
    if (!password) {
      errors.push(new MissingClientPasswordError());
    }
    if (!port) {
      errors.push(new MissingClientPortError());
    }
    if (!user) {
      errors.push(new MissingClientUserError());
    }

    if (errors.length) {
      throw new AggregateClientConfigurationError(errors);
    }
  }
}

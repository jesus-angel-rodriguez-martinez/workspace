import {
  AbstractClientService,
  AggregateConfigurationError,
  type IClientConfiguration,
  MissingDatabaseError,
  MissingHostError,
  MissingPasswordError,
  MissingPortError,
  MissingUserError
} from '@domains/client';
import { type IKernelError } from '@libs/kernel';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export class ClientService<Schema> extends AbstractClientService {
  public constructor(configuration: IClientConfiguration) {
    super(configuration);
  }

  public createClient(): Kysely<Schema> {
    const connectionString = this.createConnectionString();

    const pool = new Pool({ connectionString });
    const dialect = new PostgresDialect({ pool });
    const client = new Kysely<Schema>({
      dialect,
      plugins: [new CamelCasePlugin()]
    });
    return client;
  }

  protected createConnectionString(): string {
    const { database, host, password, port, user } = this.configuration;

    const errors: IKernelError[] = [];

    if (!database) {
      errors.push(new MissingDatabaseError());
    }
    if (!host) {
      errors.push(new MissingHostError());
    }
    if (!password) {
      errors.push(new MissingPasswordError());
    }
    if (!port) {
      errors.push(new MissingPortError());
    }
    if (!user) {
      errors.push(new MissingUserError());
    }

    if (errors.length) {
      throw new AggregateConfigurationError(errors);
    }

    const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;
    return connectionString;
  }
}

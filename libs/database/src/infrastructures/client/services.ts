import {
  AbstractClientService,
  AggregateClientConfigurationError,
  CLIENT_RULES,
  type IClientServiceConfiguration,
  InvalidClientCertificateFileNameError,
  MissingClientDatabaseError,
  MissingClientHostError,
  MissingClientPasswordError,
  MissingClientPortError,
  MissingClientUserError
} from '@domains/client';
import { type IKernelError } from '@libs/kernel';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { readFileSync } from 'node:fs';
import { Pool } from 'pg';

export class ClientService<Schema> extends AbstractClientService {
  public constructor(configuration: IClientServiceConfiguration) {
    super(configuration);
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
    const { certificateFileName, pathService } = this.configuration;
    if (!certificateFileName) {
      return undefined;
    }

    const certificatePath = pathService.resolveCertificateFile(certificateFileName);

    const content = readFileSync(certificatePath, 'utf8');
    return content;
  }

  protected validateConfiguration(configuration: IClientServiceConfiguration): void {
    const { certificateFileName, database, host, password, port, user } = configuration;

    const errors: IKernelError[] = [];

    const { ALLOWED_CHARACTERS } = CLIENT_RULES.certificateFileName.REGEX_PATTERNS;
    if (certificateFileName !== undefined && !ALLOWED_CHARACTERS.test(certificateFileName)) {
      errors.push(new InvalidClientCertificateFileNameError(certificateFileName));
    }

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

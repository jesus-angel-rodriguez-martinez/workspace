# Database

`@libs/database` provides a reusable database toolkit for building a database client, running migrations, and scaffolding migration files.

## 📦 Installation

This package is part of a monorepo managed with Rush. To add it to your project within the monorepo, run:

```bash
rush add -p @libs/database
```

## 🚀 Usage

### Client

`ClientService` builds a database client for a caller-provided schema, mapping snake_case columns to camelCase. Its configuration is validated on construction by the injected `ClientValidator`:

```ts
import { type IDatabaseSchema } from '@infrastructures/database';
import { ClientService, ClientValidator } from '@libs/database';

const clientValidator = new ClientValidator();

const clientService = new ClientService<IDatabaseSchema>({
  clientValidator,
  configuration: {
    database: 'database',
    host: 'localhost',
    password: 'password',
    port: 5432,
    user: 'user'
  }
});

const database = clientService.createClient();
```

### Certificate

Inject a `CertificateService` into `ClientService` to connect over TLS, verifying the server against that certificate authority; without it the connection does not use TLS. Certificates are read from `<cwd>/database/certificates`, next to the migrations. The injected `CertificateValidator` checks on construction that the file name is valid and that the file exists:

```ts
import { CertificateService, CertificateValidator, ClientService, PathService } from '@libs/database';

const pathService = new PathService();

const certificateValidator = new CertificateValidator({ pathService });

const certificateService = new CertificateService({
  certificateValidator,
  configuration: {
    fileName: 'global-bundle.pem'
  },
  pathService
});

const clientService = new ClientService<IDatabaseSchema>({
  certificateService,
  clientValidator,
  configuration
});
```

### Migrator

Migrations are run through the `database-migrate` binary, not by instantiating `MigratorService` directly.

```json
{
  "scripts": {
    "database:migrate": "database-migrate",
    "database:migrate:down": "database-migrate down",
    "database:migrate:reset": "database-migrate reset"
  }
}
```

The binary reads the connection settings from the environment (loaded via `dotenv`):

```bash
DATABASE=database
DATABASE_CERTIFICATE_FILE_NAME=global-bundle.pem
DATABASE_HOST=localhost
DATABASE_PASSWORD=password
DATABASE_PORT=5432
DATABASE_USER=user
```

Then run:

```bash
rushx database:migrate
rushx database:migrate:down
rushx database:migrate:reset
```

Migrations are read from `<cwd>/database/migrations`, so a command run from an API package targets that API's own migrations without extra configuration.

### Scaffolder

New migration files are scaffolded through the `database-scaffold` binary:

```json
{
  "scripts": {
    "database:migration:create": "database-scaffold"
  }
}
```

```bash
rushx database:migration:create create-users
```

This writes a timestamped `<YYYYMMDDHHMMSS>_<name>.ts` file (with empty `up` and `down` exports) to `<cwd>/database/migrations` and logs its path.

### Errors

- `AggregateCertificateConfigurationError`: Thrown by `CertificateValidator` when constructing a `CertificateService` with an invalid file name or a missing file. Its message lists each underlying error (`code` and `detail`).
- `AggregateClientConfigurationError`: Thrown by `ClientValidator` when constructing a `ClientService` with one or more missing connection values. Its message lists each underlying error (`code` and `detail`).
- `InvalidCertificateFileNameError`: Thrown when the certificate file name is not a plain file name (e.g. it contains path separators).
- `InvalidMigrationNameError`: Thrown when scaffolding a migration whose name is not lowercase letters and digits separated by single hyphens (no leading, trailing, or consecutive hyphens).
- `MigrationFailedError`: Thrown when a migration fails to run.
- `MissingCertificateFileError`: Thrown when the certificate file does not exist in `<cwd>/database/certificates`.
- `MissingClientDatabaseError`: Thrown when the database name is missing.
- `MissingClientHostError`: Thrown when the database host is missing.
- `MissingClientPasswordError`: Thrown when the database password is missing.
- `MissingClientPortError`: Thrown when the database port is missing.
- `MissingClientUserError`: Thrown when the database user is missing.
- `MissingMigrationNameError`: Thrown when scaffolding a migration without a name.

## 🧪 Testing

Uses Jest with ESM support.

Run all tests:

```bash
rushx start:test
rushx start:test:coverage
rushx test
```

Run only unit tests:

```bash
rushx start:unit-test
rushx start:unit-test:coverage
```

Run only integration tests:

```bash
rushx start:integration-test
rushx start:integration-test:coverage
```

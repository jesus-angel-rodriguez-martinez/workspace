# Database

`@libs/database` provides a reusable database toolkit for building a database client, running migrations, and scaffolding migration files.

## 📦 Installation

This package is part of a monorepo managed with Rush. To add it to your project within the monorepo, run:

```bash
rush add -p @libs/database
```

## 🚀 Usage

### Client

`ClientService` builds a database client for a caller-provided schema, mapping snake_case columns to camelCase:

```ts
import { type IDatabaseSchema } from '@infrastructures/database';
import { ClientService } from '@libs/database';

const clientService = new ClientService<IDatabaseSchema>({
  database: 'identity',
  host: 'localhost',
  password: 'postgres',
  port: 5_432,
  user: 'postgres'
});

const database = clientService.createClient();
```

### Migrator

`MigratorService` runs migrations with `up()`, `down()`, and `reset()`, reporting progress through the injected logger:

```ts
import { type IDatabaseSchema } from '@infrastructures/database';
import { ClientService, MigratorService } from '@libs/database';
import { LoggerService } from '@libs/logger';

LoggerService.init({
  applicationName: '@libs/database',
  level: 'info',
  prettify: true
});

const clientService = new ClientService<IDatabaseSchema>({
  database: 'identity',
  host: 'localhost',
  password: 'postgres',
  port: 5_432,
  user: 'postgres'
});

const loggerService = new LoggerService({
  loggerName: import.meta.url
});

const migratorService = new MigratorService({ clientService, loggerService });

await migratorService.up();
```

The migration folder defaults to `<cwd>/database/migrations`, so a command run from an API package targets that API's own migrations without extra configuration.

### Scaffolder

`ScaffolderService` scaffolds a timestamped migration file and returns its path:

```ts
import { ScaffolderService } from '@libs/database';

const scaffolderService = new ScaffolderService();

const migrationPath = await scaffolderService.create('create-users');
```

### Errors

- `AggregateConfigurationError`: Thrown when constructing a `ClientService` with one or more missing connection values (`MissingDatabaseError`, `MissingHostError`, `MissingPasswordError`, `MissingPortError`, `MissingUserError`).
- `InvalidMigrationNameError`: Thrown when scaffolding a migration whose name contains characters other than lowercase letters, digits, and hyphens.
- `MigrationFailedError`: Thrown when a migration fails to run.
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

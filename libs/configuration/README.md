# Configuration

`@libs/configuration` is a type-safe runtime validator for environment variables.

It does not load `.env` files. It reads from `process.env` and validates that required variables are present and correctly typed. Load environment variables before running your application:

```bash
node --require dotenv/config dist/index.js
```

## 📦 Installation

This package is part of a monorepo managed with Rush. To add it to your project within the monorepo, run:

```bash
rush add -p @libs/configuration
```

## 🚀 Usage

### Configuration

Define a configuration with the expected keys and their primitive types and pass it to the constructor. The whole configuration is validated and parsed once, when the service is created, and the result is cached.

Read the resolved values with full type safety through `getAll` (every value):

```ts
import { type Configuration, ConfigurationService } from '@libs/configuration';

const configuration = {
  DEBUG: 'boolean',
  PORT: 'number',
  SECRET: 'string'
} as const satisfies Configuration;

const configurationService = new ConfigurationService(configuration);

export const { DEBUG, PORT, SECRET } = configurationService.getAll();
```

Or read the resolved values with full type safety through `get` (a single value):

```ts
import { type Configuration, ConfigurationService } from '@libs/configuration';

const configuration = {
  DEBUG: 'boolean',
  PORT: 'number',
  SECRET: 'string'
} as const satisfies Configuration;

const configurationService = new ConfigurationService(configuration);

export const DEBUG = configurationService.get('DEBUG');
export const PORT = configurationService.get('PORT');
export const SECRET = configurationService.get('SECRET');
```

Because parsing happens at construction time, later changes to `process.env` do not affect an already-created service.

### Errors

Validation runs over the whole configuration in a single pass: every invalid or missing variable is collected and reported together, so a misconfigured deployment surfaces all its problems at once instead of one restart at a time.

- `AggregateConfigurationError`: Thrown by the constructor when one or more variables fail validation. Its message lists each underlying error (`code` and `detail`).

The following errors describe the individual failures gathered into the `AggregateConfigurationError`:

- `EmptyConfigurationError`: A required variable is present but empty.
- `InvalidBooleanConfigurationError`: A value cannot be parsed as `"true"` or `"false"`.
- `InvalidNumberConfigurationError`: A value cannot be parsed as a finite number.
- `MissingConfigurationError`: A required variable is not defined in `process.env`.
- `UnsupportedPrimitiveError`: A configuration declares an unsupported primitive type.

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

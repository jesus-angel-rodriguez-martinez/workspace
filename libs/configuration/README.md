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

Define a schema with the expected keys and their primitive types, then retrieve all values at once with full type safety:

```ts
import { type ConfigurationSchema, ConfigurationService } from '@libs/configuration';

const configurationSchema = {
  DEBUG: 'boolean',
  PORT: 'number',
  SECRET: 'string'
} as const satisfies ConfigurationSchema;

const configurationService = new ConfigurationService();

export const { DEBUG, PORT, SECRET } = configurationService.getAll(configurationSchema);
```

### Errors

- `EmptyConfigurationError`: Thrown when a required variable is present but empty.
- `InvalidBooleanConfigurationError`: Thrown when a value cannot be parsed as `"true"` or `"false"`.
- `InvalidNumberConfigurationError`: Thrown when a value cannot be parsed as a finite number.
- `MissingConfigurationError`: Thrown when a required variable is not defined in `process.env`.
- `UnsupportedPrimitiveError`: Thrown when a schema declares an unsupported primitive type.

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

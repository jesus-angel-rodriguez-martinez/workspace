# Logger

`@libs/logger` is a lightweight and extensible logging service with structured output and optional prettification for development environments.

## 📦 Installation

This package is part of a monorepo managed with Rush. To add it to your project within the monorepo, run:

```bash
rush add -p @libs/logger
```

## 🚀 Usage

### Initialization

`LoggerService` must be initialized once at application startup before any instance is created:

```ts
import { type Configuration, ConfigurationService } from '@libs/configuration';
import { LoggerService } from '@libs/logger';

const configuration = {
  ENVIRONMENT: 'string'
} as const satisfies Configuration;

const { ENVIRONMENT } = new ConfigurationService(configuration).getAll();
const isDevelopment = ENVIRONMENT === 'development';

LoggerService.init({
  applicationName: '@libs/logger',
  level: isDevelopment ? 'trace' : 'info',
  prettify: isDevelopment
});
```

### Logging

Create an instance per module, passing a unique `loggerName`:

```ts
import { type LoggerContext, LoggerService } from '@libs/logger';

const loggerService = new LoggerService({
  loggerName: import.meta.url
});

const data = {};
const error = new Error('...');
const message = '...';

const context = {
  error,
  data
} satisfies LoggerContext;

/* Diagnostic levels. */
loggerService.trace(message, context);
loggerService.debug(message, context);
loggerService.info(message, context);

/* Critical levels. */
loggerService.warn(message, context);
loggerService.error(message, context);
loggerService.fatal(message, context);
```

The `loggerName` is normalized into a concise, package-scoped identifier that appears in the `logger` field of every entry. Passing `import.meta.url` from `libs/logger/src/infrastructures/loggers/services.ts` yields `@libs/logger/infrastructures/loggers`: the absolute path, the `file://` scheme and the file name are dropped, keeping only the package and feature. A file at the package root collapses to the bare package name (e.g. `@libs/logger`). Any non-`file:` value is used verbatim, so explicit logical names also work.

### Shutdown

On graceful shutdown, flush any buffered logs and reset the service. After closing, `LoggerService.init()` can be called again:

```ts
import { LoggerService } from '@libs/logger';

await LoggerService.close();
```

### Errors

- `LoggerAlreadyInitializedError`: Thrown when `LoggerService.init()` is called more than once.
- `LoggerNotInitializedError`: Thrown when a `LoggerService` instance is created before `LoggerService.init()` is called.

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

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
import { LoggerService } from '@libs/logger';

LoggerService.init({
  level: 'info',
  name: '@libs/logger',
  prettify: true
});
```

### Logging

Once initialized, create an instance and log at any level. Every entry is tagged with the `name` passed to `init`:

```ts
import { type LoggerContext, LoggerService } from '@libs/logger';

const loggerService = new LoggerService();

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

### Shutdown

On graceful shutdown, reset the service. After closing, `LoggerService.init()` can be called again:

```ts
import { LoggerService } from '@libs/logger';

LoggerService.close();
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

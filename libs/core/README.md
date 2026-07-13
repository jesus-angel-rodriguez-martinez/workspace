# Core

`@libs/core` is a foundational library that provides shared contracts for error handling and service lifecycle management.

## 📦 Installation

This package is part of a monorepo managed with Rush. To add it to your project within the monorepo, run:

```bash
rush add -p @libs/core
```

## 🚀 Usage

### Errors

Extend `CoreError` to create consistent, domain-specific error types:

```ts
import { CoreError, type ICoreErrorOptions } from '@libs/core';

export class UserNotFoundError extends CoreError {
  constructor(username: string, options: ICoreErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'USER.NOT_FOUND',
      detail: `The requested user '${username}' could not be found.`,
      title: 'User not found'
    });
  }
}
```

### Services

Implement `ICoreService` to standardize the lifecycle of your services:

```ts
import { type ICoreService } from '@libs/core';

export class Service implements ICoreService {
  async init(): Promise<void> {}

  async close(): Promise<void> {}
}
```

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

# Kernel

`@libs/kernel` is a foundational library that provides shared contracts for error handling.

## 📦 Installation

This package is part of a monorepo managed with Rush. To add it to your project within the monorepo, run:

```bash
rush add -p @libs/kernel
```

## 🚀 Usage

### Errors

Extend `KernelError` to create consistent, domain-specific error types. Declare `code` and `title` as readonly fields so they keep their literal types, and pass only the `detail` to `super`:

```ts
import { type IKernelErrorOptions, KernelError } from '@libs/kernel';

export class UserNotFoundError extends KernelError {
  public readonly code = 'USER.NOT_FOUND';
  public readonly title = 'User not found';

  constructor(username: string, options: IKernelErrorOptions = {}) {
    super(`The requested user '${username}' could not be found.`, options);
  }
}
```

For errors that gather several related failures into one, extend `AggregateKernelError`. It formats the collected errors into a bulleted detail message, so each domain only declares its own `code` and `title`:

```ts
import { AggregateKernelError, type IKernelError, type IKernelErrorOptions } from '@libs/kernel';

export class AggregateConfigurationError extends AggregateKernelError {
  public readonly code = 'CONFIGURATION.INVALID_CONFIGURATION';
  public readonly title = 'Invalid configuration';

  constructor(errors: IKernelError[], options: IKernelErrorOptions = {}) {
    super(errors, options);
  }
}
```

Derive the union of a domain's errors with `InferKernelError` instead of listing them by hand. The errors module must only export kernel errors:

```ts
import { type InferKernelError } from '@libs/kernel';

export type UserError = InferKernelError<typeof import('@domains/user/core/errors')>;
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

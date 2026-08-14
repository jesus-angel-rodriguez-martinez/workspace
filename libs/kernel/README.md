# Kernel

`@libs/kernel` is a foundational library that provides shared contracts for error handling and service lifecycle management.

## 📦 Installation

This package is part of a monorepo managed with Rush. To add it to your project within the monorepo, run:

```bash
rush add -p @libs/kernel
```

## 🚀 Usage

### Errors

Extend `KernelError` to create consistent, domain-specific error types:

```ts
import { type IKernelErrorOptions, KernelError } from '@libs/kernel';

export class UserNotFoundError extends KernelError {
  constructor(username: string, options: IKernelErrorOptions = {}) {
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

Implement `IKernelService` to standardize the lifecycle of your services:

```ts
import { type IKernelService } from '@libs/kernel';

export class Service implements IKernelService {
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

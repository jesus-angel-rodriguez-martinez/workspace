# Api

`@libs/api` provides a lifecycle-managed, modular, and OpenAPI-compliant HTTP service layer for Express applications.

## 📦 Installation

This package is part of a monorepo managed with Rush. To add it to your project within the monorepo, run:

```bash
rush add -p @libs/api
```

## 🚀 Usage

### Initialization

```ts
import express from 'express';
import { type Configuration, ConfigurationService } from '@libs/configuration';
import { LoggerService } from '@libs/logger';
import {
  ApiService,
  AuthenticationMiddlewaresService,
  GlobalMiddlewaresService,
  PathsService
} from '@libs/api';

const configuration = {
  ENVIRONMENT: 'string',
  PORT: 'number',
  SECRET: 'string'
} as const satisfies Configuration;

const { ENVIRONMENT, PORT, SECRET } = new ConfigurationService(configuration).getAll();

const isDevelopment = ENVIRONMENT === 'development';

LoggerService.init({
  applicationName: 'my-app',
  level: isDevelopment ? 'trace' : 'info',
  prettify: isDevelopment
});

const loggerService = new LoggerService({ loggerName: import.meta.url });
const app = express();

const { apiDocPath, endpointsPath } = new PathsService().resolve('my-app');

const authenticationMiddlewaresService = new AuthenticationMiddlewaresService({
  loggerService,
  secret: SECRET,
  usersRepository
});

const globalMiddlewaresService = new GlobalMiddlewaresService({
  apiDocPath,
  apiMapper,
  app,
  dependencies: {},
  endpointsPath,
  loggerService
});

const apiService = new ApiService({
  app,
  authenticationMiddlewaresService,
  globalMiddlewaresService,
  loggerService,
  port: PORT
});

await apiService.init();
```

### Errors

- `BadRequestError`: Thrown when the server cannot process the request due to client-side issues such as validation errors or malformed input. [400]
- `UnauthorizedError`: Thrown when authentication is required and has failed or has not yet been provided. [401]
- `ForbiddenError`: Thrown when the server understands the request but refuses to authorize it. [403]
- `NotFoundError`: Thrown when the requested resource could not be found. [404]
- `ConflictError`: Thrown when a request could not be completed due to a conflict with the current state of the resource. [409]
- `UnsupportedMediaTypeError`: Thrown when a request contains a media type that the server does not support. [415]
- `UnprocessableEntityError`: Thrown when the server understands the content type but the contained instructions are semantically invalid. [422]
- `InternalServerError`: Thrown when an unexpected failure occurs on the server that is not directly caused by the client's request. [500]

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

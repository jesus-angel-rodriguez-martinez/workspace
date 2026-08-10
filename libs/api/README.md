# Api

`@libs/api` contains the shared HTTP error classes and NestJS utilities used across the API, including an exception filter (`{ errors }`), response interceptor (`{ data }`), and logger adapter. Together, they help keep API responses consistent.

## 📦 Installation

This package is part of a monorepo managed with Rush. To add it to your project within the monorepo, run:

```bash
rush add -p @libs/api
```

## 🚀 Usage

### Initialization

Declare a domain-specific abstract mapper by extending `AbstractApiMapper`:

```ts
import { type UserApiError } from '@infrastructures/users';
import { AbstractApiMapper } from '@libs/api';
import { type CoreError } from '@libs/core';

export abstract class AbstractUsersApiMapper extends AbstractApiMapper {
  protected constructor() {
    super();
  }

  public abstract override toApiError(error: CoreError): UserApiError | undefined;
}
```

Implement it, converting each domain error into its API error. The trailing `exhaustiveCheck` turns forgetting to map any `UserError` member into a compile-time error:

```ts
import { UserAlreadyExistsError, type UserError, UserNotFoundError } from '@domains/users';
import {
  AbstractUsersApiMapper,
  UserAlreadyExistsApiError,
  type UserApiError,
  UserNotFoundApiError
} from '@infrastructures/users';

export class UsersApiMapper extends AbstractUsersApiMapper {
  public constructor() {
    super();
  }

  public toApiError(error: UserError): UserApiError | undefined {
    if (error instanceof UserAlreadyExistsError) {
      return new UserAlreadyExistsApiError(error);
    }
    if (error instanceof UserNotFoundError) {
      return new UserNotFoundApiError(error);
    }

    const exhaustiveCheck: never = error;
    void exhaustiveCheck;

    return undefined;
  }
}
```

Every `UserError` member must be mapped: once all are handled, `error` narrows to `never` and the assignment compiles. Miss one and it fails to compile.

Compose the domain mappers into a single `ApiMapper`, then register the `ApiExceptionFilter` (errors) and the `ApiInterceptor` (successful responses):

```ts
import { UsersApiMapper } from '@infrastructures/users';
import { ApiExceptionFilter, ApiInterceptor, ApiMapper } from '@libs/api';

const usersApiMapper = new UsersApiMapper();

const apiMapper = new ApiMapper({ mappers: [usersApiMapper] });

const apiExceptionFilter = new ApiExceptionFilter({ apiMapper, loggerService });
const apiInterceptor = new ApiInterceptor();

app.useGlobalFilters(apiExceptionFilter);
app.useGlobalInterceptors(apiInterceptor);
```

The filter catches both domain errors (`CoreError`, mapped via the `ApiMapper`) and API errors (`ApiError`, used as-is); unmapped errors fall back to a generic `InternalServerError`, serialized as `{ errors: [...] }`. Successful responses are wrapped by the `ApiInterceptor` as `{ data: ... }`.

Route Nest's own logs through your application logger (and silence its bootstrap noise) with the `LoggerAdapter` when creating the app:

```ts
import { LoggerAdapter } from '@libs/api';

const logger = new LoggerAdapter(loggerService);

const app = await NestFactory.create(AppModule, {
  bufferLogs: true,
  logger
});
```

### Errors

- `BadRequestError`: Thrown when the server cannot process the request due to client-side issues such as validation errors or malformed input. [400]
- `UnauthorizedError`: Thrown when authentication is required and has failed or has not yet been provided. [401]
- `ForbiddenError`: Thrown when the server understands the request but refuses to authorize it. [403]
- `NotFoundError`: Thrown when the requested resource could not be found. [404]
- `MethodNotAllowedError`: Thrown when the request method is not allowed for the requested resource. [405]
- `NotAcceptableError`: Thrown when the resource cannot produce a response matching the accepted content types. [406]
- `RequestTimeoutError`: Thrown when the server times out waiting for the request. [408]
- `ConflictError`: Thrown when a request could not be completed due to a conflict with the current state of the resource. [409]
- `GoneError`: Thrown when the requested resource is no longer available. [410]
- `UnsupportedMediaTypeError`: Thrown when a request contains a media type that the server does not support. [415]
- `UnprocessableEntityError`: Thrown when the server understands the content type but the contained instructions are semantically invalid. [422]
- `TooManyRequestsError`: Thrown when the client has sent too many requests in a given amount of time. [429]
- `InternalServerError`: Thrown when an unexpected failure occurs on the server that is not directly caused by the client's request. [500]
- `NotImplementedError`: Thrown when the server does not support the functionality required to fulfill the request. [501]
- `BadGatewayError`: Thrown when the server receives an invalid response from an upstream server. [502]
- `ServiceUnavailableError`: Thrown when the server is currently unable to handle the request. [503]
- `GatewayTimeoutError`: Thrown when the server does not receive a timely response from an upstream server. [504]

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

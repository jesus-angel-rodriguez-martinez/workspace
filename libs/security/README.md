# Security

`@libs/security` provides lightweight and reusable security utilities for handling credential processing, identity validation, and authentication token management.

## 📦 Installation

This package is part of a monorepo managed with Rush. To add it to your project within the monorepo, run:

```bash
rush add -p @libs/security
```

## 🚀 Usage

### Cryptography

`CryptographyService` handles salt generation, password hashing via PBKDF2, and constant-time password verification. Its configuration is validated on construction by the injected `CryptographyValidator`:

```ts
import { CryptographyService, CryptographyValidator } from '@libs/security';

const cryptographyValidator = new CryptographyValidator();

const cryptographyService = new CryptographyService({
  configuration: {
    digest: 'sha256',
    iterations: 600_000,
    keyLength: 32,
    saltLength: 16
  },
  cryptographyValidator
});

const password = 'plain-text-password';
const salt = await cryptographyService.generateSalt();
const hashedPassword = await cryptographyService.hashPassword(password, salt);
const areCredentialsValid = await cryptographyService.verifyPassword(password, salt, hashedPassword);
```

### Token

`TokenService` issues and verifies signed JWT tokens for a user id.
Each instance issues and accepts a single token `type` (`access` or `refresh`).
Its configuration is validated on construction by the injected `TokenValidator`.

#### Access token

```ts
import { TokenService, TokenValidator } from '@libs/security';

const tokenValidator = new TokenValidator();

const accessTokenService = new TokenService({
  configuration: {
    algorithm: 'HS256',
    expiresIn: 15 * 60,
    secret: 'ACCESS_SECRET',
    type: 'access'
  },
  tokenValidator
});

const userId = '550e8400-e29b-41d4-a716-446655440000';
const accessToken = accessTokenService.issueToken(userId);
const { exp, iat, sub, type } = accessTokenService.verifyToken(accessToken);
```

#### Refresh token

```ts
import { TokenService, TokenValidator } from '@libs/security';

const tokenValidator = new TokenValidator();

const refreshTokenService = new TokenService({
  configuration: {
    algorithm: 'HS256',
    expiresIn: 7 * 24 * 60 * 60,
    secret: 'REFRESH_SECRET',
    type: 'refresh'
  },
  tokenValidator
});

const userId = '550e8400-e29b-41d4-a716-446655440000';
const refreshToken = refreshTokenService.issueToken(userId);
const { exp, iat, sub, type } = refreshTokenService.verifyToken(refreshToken);
```

### Refresh flow

#### How it works

1. The client logs in and receives a short-lived **access token** (minutes) and a long-lived **refresh token** (days).
2. The client sends the access token on every request. If it leaks, the damage window is its short lifetime.
3. When the access token expires, the client sends the refresh token — and only the refresh token — to the refresh endpoint, which verifies it and issues a new access token.
4. When the refresh token expires, the client must log in again.

### Errors

- `AggregateCryptographyConfigurationError`: Thrown by `CryptographyValidator` when constructing a `CryptographyService` with one or more configuration values that do not meet their security requirement. Its message lists each underlying error (`code` and `detail`).
- `AggregateTokenConfigurationError`: Thrown by `TokenValidator` when constructing a `TokenService` with one or more configuration values below their minimum security requirement. Its message lists each underlying error (`code` and `detail`).
- `InvalidCryptographyKeyLengthError`: Thrown when the configured key length differs from the output length of the digest.
- `InvalidTokenExpiresInError`: Thrown when the configured token `expiresIn` is below its minimum seconds.
- `TokenExpiryError`: Thrown when verifying a token that has expired.
- `TokenIssuanceError`: Thrown when a token cannot be issued.
- `TokenValidationError`: Thrown when verifying a token whose signature or format is invalid, or whose `type` differs from the configured one.
- `WeakCryptographyIterationsError`: Thrown when the configured number of iterations is below its minimum security requirement.
- `WeakCryptographySaltLengthError`: Thrown when the configured salt length is below its minimum security requirement.
- `WeakTokenSecretError`: Thrown when the configured token secret is below its minimum security requirement.

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

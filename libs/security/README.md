# Security

`@libs/security` provides lightweight and reusable security utilities for handling credential processing, identity validation, and authentication token management.

## 📦 Installation

This package is part of a monorepo managed with Rush. To add it to your project within the monorepo, run:

```bash
rush add -p @libs/security
```

## 🚀 Usage

### Cryptography

`CryptographyService` handles salt generation, password hashing via PBKDF2, and constant-time password verification:

```ts
import { CryptographyService } from '@libs/security';

const cryptographyService = new CryptographyService({
  digest: 'sha256',
  iterations: 100_000,
  keyLength: 64,
  saltLength: 16
});

const password = 'plain-text-password';
const salt = await cryptographyService.generateSalt();
const hashedPassword = await cryptographyService.hashPassword(password, salt);
const areCredentialsValid = await cryptographyService.verifyPassword(password, salt, hashedPassword);
```

### Token

`TokenService` generates and verifies signed JWT authentication tokens from a user id:

```ts
import { TokenService } from '@libs/security';

const tokenService = new TokenService({
  algorithm: 'HS256',
  expiresIn: 3_600,
  secret: 'SECRET'
});

const userId = '550e8400-e29b-41d4-a716-446655440000';
const token = tokenService.generateToken(userId);
const { exp, iat, sub } = tokenService.verifyToken(token);
```

### Errors

- `AggregateCryptographyConfigurationError`: Thrown when constructing a `CryptographyService` with one or more configuration values below their minimum security requirement. Its message lists each underlying error (`code` and `detail`).
- `AggregateTokenConfigurationError`: Thrown when constructing a `TokenService` with one or more configuration values below their minimum security requirement. Its message lists each underlying error (`code` and `detail`).
- `TokenExpiryError`: Thrown when verifying a token that has expired.
- `TokenIssuanceError`: Thrown when an authentication token cannot be issued.
- `TokenValidationError`: Thrown when verifying a token whose signature or format is invalid.
- `WeakCryptographyIterationsError`: Thrown when the configured number of iterations is below its minimum security requirement.
- `WeakCryptographyKeyLengthError`: Thrown when the configured key length is below its minimum security requirement.
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

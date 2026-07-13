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
const isPasswordValid = await cryptographyService.verifyPassword(password, salt, hashedPassword);
```

### Tokens

`TokenService` generates and verifies signed JWT authentication tokens from a user id:

```ts
import { ConfigurationService } from '@libs/configuration';
import { TokenService } from '@libs/security';

const { SECRET } = new ConfigurationService().getAll({ SECRET: 'string' });

const tokenService = new TokenService({
  algorithm: 'HS256',
  expiresIn: 3_600,
  secret: SECRET
});

const token = tokenService.generateToken('550e8400-e29b-41d4-a716-446655440000');
```

Use `verifyToken` to validate the signature and expiration of a token. It throws if the token is invalid or expired:

```ts
const { exp, iat, sub } = tokenService.verifyToken(token);
```

### Errors

- `TokenExpiryError`: Thrown when verifying a token that has expired.
- `TokenIssuanceError`: Thrown when an authentication token cannot be issued.
- `TokenValidationError`: Thrown when verifying a token whose signature or format is invalid.
- `WeakCryptographyConfigurationError`: Thrown when constructing a `CryptographyService` with a configuration value below its minimum security requirement.
- `WeakTokenConfigurationError`: Thrown when constructing a `TokenService` with a configuration value below its minimum security requirement.

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

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

`TokenService` generates signed JWT authentication tokens from a secure user payload:

```ts
import { ConfigurationService } from '@libs/configuration';
import { type ISecureUser, TokenService } from '@libs/security';

const { SECRET } = new ConfigurationService().getAll({ SECRET: 'string' });

const tokenService = new TokenService({
  algorithm: 'HS256',
  expiresIn: 3_600,
  secret: SECRET
});

const secureUser: ISecureUser = {
  about: 'Software engineer',
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Jesús Ángel Rodríguez Martínez',
  username: 'jesus-angel-rodriguez-martinez'
};

const token = tokenService.generateToken(secureUser);
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

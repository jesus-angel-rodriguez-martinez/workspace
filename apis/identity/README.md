# Identity

`@apis/identity` is the identity service: it registers accounts, signs users in, and issues and refreshes their session tokens.

## 🚀 Usage

This package is part of a monorepo managed with Rush. To run it locally:

1. Copy `.env.sample` to `.env` and fill in the empty values.
2. Start the local database from the root `docker-compose.yml`.
3. Apply the database migrations.
4. Start the API in watch mode.

The scripts for migrations and for starting the API are listed in `package.json`.

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

# Libraries

Shared, reusable building blocks that every API composes. Each library documents its usage, public API, and errors in its own `README.md`.

## 🏛️ Architecture

Every library follows the same layout under `src/`:

- `domains/` — business rules; no framework or library types.
  - `<domain>/` — one folder per domain; singular name.
    - `core/` — the domain contracts; implemented in infrastructures.
      - `abstracts.ts` — abstract services and validators.
      - `constants.ts` — domain rules and limits.
      - `errors.ts` — domain errors.
      - `index.ts` — re-exports the core files.
      - `types.ts` — types and interfaces.
    - `index.ts` — the domain's public entry point, imported as `@domains/<domain>`.
  - `index.ts` — re-exports every domain.
- `infrastructures/` — implementations of the domain contracts; the only place for framework and library code.
  - `<domain>/` — one folder per domain; same name as in `domains/`.
    - `index.ts` — the domain's infrastructure entry point, imported as `@infrastructures/<domain>`.
    - `mappers.ts` — conversions between models.
    - `services.ts` — concrete services.
    - `services.integration.test.ts` / `services.unit.test.ts` — tests, next to the code they cover.
    - `types.ts` — implementation-only types.
    - `validators.ts` — concrete validators.
  - `index.ts` — re-exports every infrastructure.
- `index.ts` — the package entry point, re-exporting domains and infrastructures; consumers import it as `@libs/<lib>`.

Every `index.ts` is a barrel: it only re-exports, never holds code. Files are named in plural after what they contain (`errors.ts`, `services.ts`…); a domain adds other files under the same rule when it needs them.

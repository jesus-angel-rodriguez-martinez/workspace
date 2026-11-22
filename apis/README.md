# APIs

Services that compose the shared libraries to implement their own business rules, application logic, and delivery mechanisms.

## 🏛️ Architecture

Every API follows the same layout:

- `database/` — database resources; no application code.
  - `certificates/` — public CA bundles for TLS.
  - `migrations/` — schema migrations; ordered by their timestamp prefix.
  - `volume/` — local database data; git-ignored.
- `postman/` — request collections for manually exercising the API; no real credentials.
- `src/` — the API source code; compiled to `dist/`.
  - `domains/` — business rules; no framework or library types.
    - `<domain>/` — one folder per domain; singular name.
      - `app/` — use cases; depend only on abstractions.
        - `abstracts.ts` — abstract application.
        - `apps.ts` — the application implementing the use cases.
        - `index.ts` — re-exports the use cases.
        - `types.ts` — inputs, outputs, and options of the use cases.
      - `core/` — the domain contracts; implemented in infrastructures.
        - `abstracts.ts` — abstract services and validators.
        - `constants.ts` — domain rules and limits.
        - `errors.ts` — domain errors.
        - `index.ts` — re-exports the core files.
        - `types.ts` — types and interfaces.
      - `repository/` — repository ports; implemented in infrastructures.
        - `abstracts.ts` — abstract repository.
        - `index.ts` — re-exports the repository ports.
        - `types.ts` — repository models.
      - `index.ts` — the domain's public entry point, imported as `@domains/<domain>`.
    - `index.ts` — re-exports every domain.
  - `infrastructures/` — adapters for the domains; the only place for framework and library code.
    - `<domain>/` — one folder per domain; same name as in `domains/`.
      - `api/` — HTTP delivery; no business logic.
        - `constants.ts` — error mappings.
        - `controllers.ts` — HTTP controllers.
        - `index.ts` — re-exports the HTTP delivery files.
        - `modules.ts` — framework modules.
        - `responses/` — HTTP response mapping; domain models never reach the client directly.
          - `abstracts.ts` — abstract response mappers.
          - `index.ts` — re-exports the response mappers.
          - `mappers.ts` — domain → response conversions.
          - `types.ts` — response shapes.
      - `repository/` — repository adapters; implement the domain repository ports.
        - `<engine>/` — one implementation per storage engine; interchangeable behind the same port.
          - `index.ts` — re-exports the engine's repository.
          - `repositories.ts` — the repository implementation.
        - `index.ts` — re-exports the repository adapters.
        - `mappers.ts` — row ↔ domain model conversions.
        - `types.ts` — table types.
      - `index.ts` — the domain's infrastructure entry point, imported as `@infrastructures/<domain>`.
      - `validators.ts` — input validators.
    - `index.ts` — re-exports every infrastructure.
  - `main.ts` — composition root; the only place where concrete classes are instantiated.

Every `index.ts` is a barrel: it only re-exports, never holds code. Files are named in plural after what they contain (`errors.ts`, `controllers.ts`…); a domain adds other files under the same rule when it needs them.

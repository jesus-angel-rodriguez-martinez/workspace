# Workspace

Project overview: `@README.md`.

## 🏛️ Architecture

APIs and libraries follow distinct structural conventions documented in `libs/README.md` and `apis/README.md`.

### Dependencies

- Define abstractions in the domain; implement them in infrastructures.
- Delegate dependency creation to the composition root; inject dependencies through constructor options.
- Depend only on abstractions; use library-defined abstract classes and types, never concrete implementations.

### Layer boundaries

- Keep domain contracts independent of external dependencies; reference only domain types and library abstractions.
- Keep controllers free of business logic; delegate to the use case and map its result to a response.
- Keep third-party errors within the infrastructure layer; convert them into domain errors and preserve the original as cause.

## 📖 Conventions

### Classes

- Declare a protected helper as abstract in the domain when its signature uses only domain or primitive types; the contract belongs to the domain, and only helpers exposing library types stay in the implementation.
- Declare an access modifier on every class member, including constructors; visibility is then a deliberate choice rather than a default.
- Guard optional dependencies in a small dedicated method with an early return; optional-chaining calls and ternaries hide the branch and make the flow harder to read.
- Pass a single options object to service constructors, grouping plain values under its configuration and keeping collaborators as sibling fields; dependencies stay visible at a glance, and the configuration can be validated and stored as one unit.
- Validate the configuration with the injected validator before storing it, then keep a frozen copy with read-only fields; the service must not change if the caller mutates the original object.

### Constants

- Keep each domain's limits in a single rules constant within its core, grouped by concept and declared immutable; validators read every limit from it, never from inline numbers.
- Name each domain's error-to-HTTP table after its domain, as for the rules constant; mappings from every domain merge without collisions.

### Documentation

- Describe each README error by when it is thrown, in a single alphabetized list; consumers look errors up by name and need the trigger, not the implementation.
- Update a library's README in the same change that alters its public API or errors; a change with outdated docs is incomplete.

### Environment variables

- Group variables in every env template by concern under a comment header, with an emoji in application templates, and keep the groups alphabetized; related settings stay together.
- Name variables in upper snake case and keep them alphabetized within their group; a new variable has one obvious place.

### Errors

- Extend every error from the kernel base errors; all packages then share one shape that the API layer can map.
- Map domain errors to HTTP through a table that can hide or reword each error; some domain errors must never reach the client and must surface as a generic server error.
- Name error codes and classes after their domain folder, never the package; the domain is the meaningful namespace, and class names must stay unique because each package re-exports every domain.

### Modules

- Declare type-only imports inline; each module keeps a single import statement.
- Export everything by name, never as a default export; every symbol keeps one name across the codebase and barrels can re-export it.
- Import through the package path aliases; deep relative paths break when files move.
- Omit file extensions; module resolution relies on extensionless paths.

### Naming

- End error class names with Error; errors stay recognizable wherever they are thrown or caught.
- Name files in the plural after what they contain, except barrels; the name tells which kind of declarations the file holds.
- Prefix interfaces with I and abstract classes with Abstract, except abstract error bases, and leave concrete classes unprefixed; a name alone tells a contract from its implementation.
- Use singular names for domain and infrastructure folders but plural names for collections; a folder names a concept, while a collection holds many items.
- Write constants in upper snake case; fixed values stand out from variables.

### Ordering

- Alphabetize keys, properties, and named imports with no exceptions for importance, and re-check siblings when adding one; a single rule avoids debates and keeps diffs predictable.
- List type aliases before interfaces in type files, each group alphabetized; readers meet the simple types before the shapes built on them.

### Packages

- Give every package its own README and license file; each package documents and licenses itself.
- Scope each package name to its group, as in libs or apis, with matching keywords; the name tells where a package lives and what it is.

### Tests

- Assert protected behavior through mocks, never by casting; tests respect encapsulation like any other consumer.
- Group tests by method or behavior, never by state, with one nested group per input flag when tests depend on it; every method is found in one place and test names stay short.
- Keep test files next to the code they cover, split into unit and integration suites; each suite runs on its own.
- Mock modules with the ESM-specific mocking API and import the code under test afterwards; tests run as native ESM, where the classic module mock has no effect.
- Set up shared state once in an outer setup hook, clearing mocks last; setup calls must not leak into assertions.

### TSDoc

- Document a thrown error only on the method that throws it, and only domain errors in abstracts; propagated and library errors are not checked by the compiler and drift silently.
- Document every contract, including each abstract class and interface itself, their methods and fields, errors, constants, and type aliases; implementations stay undocumented because they inherit the contract's documentation.
- Order tags as summary, parameters, return value, and thrown errors, separating groups with a blank line; every comment reads the same way.

### Types

- Exclude fields by first picking them from the source type, never by listing their names directly; the compiler then checks that they still exist, so renaming a field breaks the build instead of silently exposing it.
- Write code for the strict compiler options, omitting optional properties instead of assigning undefined and handling missing values on indexed access; the build rejects the alternatives.

### Validation

- Implement each validator as its own class extending a domain abstract; validation stays replaceable and testable like any other contract.
- Report every violation at once when validating configuration, wrapped in a single aggregate error; startup fails with the complete list of what to fix.
- Stop at the first violation when validating request input, throwing a single error; the API answers with one clear error per request.

## ⚖️ Decision-making

- Ask before adding dependencies, changing public APIs, introducing breaking changes, or moving code between packages; these change what other code depends on.
- Build on the current implementation first; check that a shape already exists in sibling classes before writing new code.
- Check whether seemingly verbose code serves a non-obvious safety or design purpose; only then suggest simplifying it.
- Explain any conflict between a request and the architecture or these conventions; only then proceed.
- Follow the closest existing convention for low-risk details, such as local names or small helpers; don't ask about them.
- Keep dependency versions and the lockfile as they are; change them only when the request requires it.
- Never invent conventions or requirements; always distinguish established conventions from proposals.
- Stay open to established patterns from this repo or the industry; when one fits better, finish with the existing pattern and list it under Proposals (what, where, why, trade-off, and the concrete issue it solves) instead of applying or discarding it.

## 🌿 Git

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/), with a [gitmoji](https://gitmoji.dev/) that matches the change at the start of the description: `<type>: :<gitmoji>: <lowercase summary>`.

## 🔒 Sensitive data

- Never commit `.env` files; only the `.env*.sample` templates are tracked, with non-secret defaults and secret values left empty.
- Never hardcode real secrets in source code, tests, or fixtures; use obviously fake values instead.
- Never log credentials, such as passwords, hashes, salts, or tokens; not even partially or masked.
- Never log personal data (PII), such as names, usernames, or emails; log internal identifiers like the user `id` instead.
- Never read, expose, or copy values from `.env` files, in responses, logs, tests, or subagent reports; read the `.env*.sample` templates to learn which variables exist.

## 🏷️ Versions

Never assume tool, dependency, or environment versions.

Always verify them against the project's source of truth, including configuration files, manifests, and lockfiles.

## 🔄 Workflow

1. Before changing code, read the package `README.md`, the domain abstracts, the existing implementations, and sibling tests.
2. Implement following the closest existing pattern.
3. Add or update tests, and keep docs in sync (see [Documentation](#documentation)).
4. Validate with Rush from the workspace root (never `cd` into a package or bypass Rush), selecting the narrowest projects that cover the change:
   - `rush build --to <pkg>` — typechecks; tests alone may not catch type errors.
   - `rush test --only <pkg>`.
   - When a lib changes, also `rush build --impacted-by <pkg>` and `rush test --impacted-by <pkg>`.
5. Never claim a command, build, or test succeeded unless it actually ran and you inspected its output.
6. End your final answer with:
   - **Changes** — files modified.
   - **Validation** — commands run and their result.
   - **Proposals** — if any (see Decision-making).
   - **Verify** — a single-line command, runnable from the workspace root, that tests, then builds, then starts every affected package, starting only packages that can be started; the user can confirm the change works with one copy and paste.

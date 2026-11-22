# Workspace

A [Rush](https://rushjs.io/) monorepo of reusable, ESM-first TypeScript libraries and the APIs built on top of them.

## 🎯 Purpose

This workspace builds **multiple APIs** on a **shared foundation**, using **Clean Architecture** as the architectural backbone across all services.
Business rules remain independent of frameworks, delivery mechanisms, and infrastructure, ensuring clear boundaries and consistent design.

The system is designed to **scale from day one**. Rather than introducing architectural complexity prematurely, we establish solid, reusable foundations that support growth without requiring fundamental architectural changes as traffic, services, and business requirements evolve.

## 🏛️ Architecture

The workspace is organized into two groups of packages:

`apis/*` — **Service implementations**. Each API composes shared libraries to implement its own business rules, application logic, and delivery mechanisms. APIs own their service-specific behavior without duplicating shared functionality.

`libs/*` — **Shared foundation**. Dependency-light, reusable building blocks that encapsulate cross-cutting concerns, common capabilities, and foundational contracts. Services compose them rather than reimplement them.

Every package splits its code into **domains** — business rules and the contracts they depend on — and **infrastructures**, the adapters that implement those contracts. Dependencies always point inward: domains never depend on infrastructures, and libraries never depend on APIs.

## 📦 Packages

Each package ships its own `README.md` with full usage and examples; each API documents its setup in its own folder.

| Package                                               | Description                                                                            |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [`@apis/identity`](apis/identity)                     | Identity service for account registration, sign in, and session tokens.                |
| [`@libs/api`](libs/api/README.md)                     | API services for standard errors, error mapping, and consistent responses.             |
| [`@libs/configuration`](libs/configuration/README.md) | Configuration service for type-safe loading and validation of environment variables.   |
| [`@libs/database`](libs/database/README.md)           | Database services for client creation, transactions, and schema migrations.            |
| [`@libs/kernel`](libs/kernel/README.md)               | Kernel services for the base errors and transaction contracts shared by every package. |
| [`@libs/logger`](libs/logger/README.md)               | Logger service for structured, leveled logging with readable output in development.    |
| [`@libs/security`](libs/security/README.md)           | Security services for password hashing and authentication token management.            |

## 📄 License

All packages are released under the **MIT** license. Each package includes its own `LICENSE` file.

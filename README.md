# Workspace

A [Rush](https://rushjs.io/) monorepo of reusable, ESM-first TypeScript libraries and the APIs built on top of them.

## 🎯 Purpose

This workspace builds **multiple APIs** on a shared foundation, following **Clean Architecture** to keep business rules independent from frameworks, transports, and infrastructure, and using it as the backbone across every service. The goal is to design the system to **scale** from the start — even while traffic is low — so the same foundations hold as it grows.

The plan is to build several APIs on top of these foundations, such as a **users** API for identity, accounts, and authentication, and an **ask-me-anything** API for question-and-answer style interactions, with more to come.

The `libs/*` packages are the shared foundation: dependency-light building blocks that each API composes rather than reimplements.

## 📦 Packages

Each package ships its own `README.md` with full usage and examples. Follow the links below.

| Package                                               | Description                                                                                                 |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`@libs/api`](libs/api/README.md)                     | Shared HTTP error classes and NestJS utilities (exception filter, interceptor, logger adapter).             |
| [`@libs/configuration`](libs/configuration/README.md) | Type-safe runtime validator for environment variables.                                                      |
| [`@libs/database`](libs/database/README.md)           | Reusable toolkit for building a database client, running migrations, and scaffolding migration files.       |
| [`@libs/kernel`](libs/kernel/README.md)               | Foundational library providing shared contracts for error handling and service lifecycle management.        |
| [`@libs/logger`](libs/logger/README.md)               | Lightweight, extensible logging service with structured output and optional prettification for development. |
| [`@libs/security`](libs/security/README.md)           | Security utilities for credential processing, identity validation, and authentication token management.     |

## 📄 License

All packages are released under the **MIT** license. Each package includes its own `LICENSE` file.

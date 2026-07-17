# Workspace

A [Rush](https://rushjs.io/) monorepo of reusable, ESM-first TypeScript libraries and the APIs built on top of them.

## 🎯 Purpose

This workspace is a playground for building **multiple APIs** and experimenting with **multiple architectures**. The guiding idea is **Clean Architecture**, keeping business rules independent from frameworks, transports, and infrastructure, and using it as the backbone across every service. From there the plan is to explore **AWS** (and more) as deployment targets and integrations, layering additional patterns and technologies on top of the same shared foundations.

The plan is to build several APIs on top of these foundations, such as a **users** API for identity, accounts, and authentication, and an **ask-me-anything** API for question-and-answer style interactions, with more to come. Each one is an opportunity to try a different architectural approach.

The `libs/*` packages are the shared foundation: dependency-light building blocks that each API composes rather than reimplements.

## 📦 Packages

Each package ships its own `README.md` with full usage and examples. Follow the links below.

| Package                                               | Description                                                                                                 |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`@libs/core`](libs/core/README.md)                   | Foundational library providing shared contracts for error handling and service lifecycle management.        |
| [`@libs/configuration`](libs/configuration/README.md) | Type-safe runtime validator for environment variables.                                                      |
| [`@libs/logger`](libs/logger/README.md)               | Lightweight, extensible logging service with structured output and optional prettification for development. |
| [`@libs/security`](libs/security/README.md)           | Security utilities for credential processing, identity validation, and authentication token management.     |

## 📄 License

All packages are released under the **MIT** license. Each package includes its own `LICENSE` file.

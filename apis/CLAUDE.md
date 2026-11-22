# APIs

@README.md

## 🗄️ Database

- Write snake_case only inside migrations; use camelCase everywhere else, including queries.
- Order migration columns alphabetically; the ordering rule applies to them too.

## 📨 Events

- Publish events from a separate poller, never from the request path; requests stay fast, and publishing retries on its own.
- Write each domain event to the outbox in the same unit of work as its entity; inserting and publishing separately loses events when the second step fails.

## 💻 Local environment

- Never start an API or run migrations unless the user asks; they start long-running processes or change the database state.

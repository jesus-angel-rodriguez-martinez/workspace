---
name: new-migration
description: Scaffolds a new database migration for an API and writes its up and down steps. Use when the user asks to change the database schema.
argument-hint: <api> <migration-name>
disable-model-invocation: true
---

Create the migration `$ARGUMENTS` (API, then migration name).

1. Read the `apis/CLAUDE.md` Database rules and the existing migrations in `apis/<api>/database/migrations/`; the new one mirrors their style.
2. Check that the name uses lowercase letters and digits separated by single hyphens; the scaffolder rejects anything else.
3. Scaffold the file from the workspace root with `(cd apis/<api> && rushx database:migration:create <migration-name>)`; never write the timestamp by hand.
4. Write `up`, then a `down` that fully reverses it.
5. Update the table types and mappers in the API's repository infrastructure when the schema they describe changes.
6. Never run the migration; tell the user the command instead, as the Local environment rules require.
7. Follow the Workflow section of `CLAUDE.md` to validate and to end the answer.

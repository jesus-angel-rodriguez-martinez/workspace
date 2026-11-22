---
name: feature
description: Takes a feature from plan to reviewed change — the architect plans it, the user approves, the main session implements, and the conventions and security reviewers review it. Use when the user asks to build a feature end to end.
argument-hint: <feature description>
disable-model-invocation: true
---

Build the feature: $ARGUMENTS

1. **Plan** — ask the architect agent for a plan of the feature. Show the user its Plan, Decisions, and Proposals, and wait for approval; never implement an unapproved plan.
2. **Implement** — follow the approved plan and the Workflow section of `CLAUDE.md`, including tests, README updates, and Rush validation.
3. **Review** — ask the conventions-reviewer and security-reviewer agents to review the change at the same time. Ask the security-reviewer only when the change touches authentication, tokens, passwords, sensitive data, configuration, or database access.
4. **Fix** — apply the findings that cite a documented rule, then validate again. List the findings you did not apply, with the reason, so the user decides.
5. **Clean up** — remove the generated `.rush` and `.claude` folders inside packages.
6. End the answer as the Workflow section requires, adding **Reviews** with each reviewer's findings and what happened to them.

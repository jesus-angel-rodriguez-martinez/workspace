---
name: new-domain
description: Scaffolds a new domain in a library or an API, following the package layout and the closest existing domain. Use when the user asks to add a domain.
argument-hint: <package> <domain>
disable-model-invocation: true
---

Add the domain `$ARGUMENTS` (package, then domain name).

1. Read the package `README.md` and the layout in `libs/README.md` or `apis/README.md`, whichever the package belongs to.
2. Pick the closest existing domain in the same package, or in a sibling package when it has none; every file mirrors its shape.
3. Ask the architect agent for a plan, passing the package, the domain, and what the user wants it to do; wait for the user to approve it.
4. Create the domain contracts first, then the infrastructure, then register both in the `index.ts` barrels that re-export every domain and every infrastructure.
5. Wire the new classes in the composition root only when the package has one.
6. Add unit tests next to every implementation, and integration tests when the sibling domain has them.
7. Update the package `README.md` with the new public API and errors.
8. Follow the Workflow section of `CLAUDE.md` to validate and to end the answer.

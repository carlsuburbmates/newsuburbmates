# Contributing to Documentation

## Automated Documentation Index

This project uses an automated script to keep the documentation index (`docs/index.md`) up to date.

**Whenever you add, remove, or edit any Markdown file in the `docs/` directory, you must run:**

```bash
pnpm docs:index
```

This will regenerate the documentation index with the latest list of docs and descriptions.

- The script is defined in `package.json` as `docs:index`.
- The script file is `auto-update-docs-index.js` in the project root.

## Best Practices
- Run the docs index update script before every commit that changes documentation.
- Optionally, set up a git pre-commit or post-commit hook to automate this step.
- Review the generated `docs/index.md` for accuracy before pushing changes.

---

For questions, see the comments in `auto-update-docs-index.js` or contact the project maintainer.

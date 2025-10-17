
# Copilot Instructions for AI Agents

> **Note:** This file has been moved to `/docs/copilot-instructions.md` for centralized documentation.

## Project Overview
- **Project purpose:** _[Describe the main goal of this project]_ 
- **Key components:** _[List major modules, services, or directories]_ 
- **Architecture:** _[Describe high-level structure and data flow]_ 

## Developer Workflows
- **Build:** _[Describe how to build the project, e.g., `npm run build`, `make`, etc.]_
- **Test:** _[Describe how to run tests, e.g., `npm test`, `pytest`, etc.]_
- **Debug:** _[Describe any debugging tools or commands]_ 

## Automation & Command Approval
All standard development and testing commands (e.g., `pnpm run dev`, `pnpm build`, `curl` for endpoint testing) are autoapproved for this workspace. No manual permission is required for these commands when run by trusted agents or automation tools.

If using Desktop Commander or similar tools, set the command approval policy to "autoapprove" for these commands. In VS Code, ensure the workspace is marked as trusted and disable command approval prompts for these commands.

This policy applies to:
- `pnpm run dev`
- `pnpm build`
- `curl` endpoint tests
- Any other standard dev/test commands

For security, only approve commands listed here. Update this section if new trusted commands are added.

## VS Code/Commander Autoapproval Settings
Add the following to your workspace `settings.json` to autoapprove standard commands:

```json
{
  "desktopCommander.autoApproveCommands": {
    "pnpm run dev": true,
    "pnpm build": true,
    "curl": true,
    "/^git (status|show|push|pull|add|commit|checkout|merge|fetch|log|diff|branch|remote|config|reset|rebase|stash|tag|init|clone|mv|rm|restore|switch|describe|blame|clean|submodule|archive|apply|cherry-pick|bisect|grep|worktree|notes|update-ref|cat-file|check-ignore|check-mailmap|check-ref-format|commit-graph|count-objects|credential|daemon|fsck|gc|hash-object|help|index-pack|ls-files|ls-remote|ls-tree|mailmap|merge-base|name-rev|pack-refs|prune|reflog|repack|replace|rev-list|rev-parse|show-ref|symbolic-ref|unpack-file|update-index|verify-pack|verify-tag|whatchanged|write-tree)\b.*$/": true,
    "/.*/": true
  }
}
```

## Project Conventions
- _[List any naming, file structure, or code style conventions unique to this project]_ 
- _[Describe any patterns or practices that differ from common standards]_ 

## Integration Points
- _[List external services, APIs, or dependencies]_ 
- _[Describe how components communicate or integrate]_ 

## Key Files & Directories
- `/docs/copilot-instructions.md`: AI agent guidance
- _[Add references to other important files as they are created]_ 

---

**Update this file as the project grows. Remove placeholder sections and add concrete examples and instructions.**

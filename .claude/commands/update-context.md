---
description: Update CLAUDE.md with decisions, learnings, and current status
---

# Update Project Context

You are updating CLAUDE.md with current project status, decisions, and learnings.

## Your Task

Update the CLAUDE.md file to reflect the current state of the project, recent decisions, learnings, and next steps. This file serves as persistent memory across sessions.

## When to Use This Command

Update CLAUDE.md when:
- ✅ A phase is completed
- ✅ A significant feature is implemented
- ✅ An important decision is made
- ✅ A valuable lesson is learned
- ✅ The next steps change
- ✅ A blocker is encountered or resolved
- ✅ At the end of a productive session

## Update Process

### 1. Read Current CLAUDE.md

First, read the existing CLAUDE.md to understand what's already documented.

### 2. Gather Update Information

Collect information to add:
- What was accomplished recently?
- What decisions were made and why?
- What was learned?
- What's the current status?
- What are the next steps?
- Are there any blockers?

### 3. Update Relevant Sections

Update these sections as appropriate:

#### Architecture Decisions
```markdown
### Decisions Made

**[Decision Name]** (Date: YYYY-MM-DD)
- **Decision:** What was decided
- **Rationale:** Why this decision was made
- **Alternatives considered:** What else was evaluated
- **Trade-offs:** Pros and cons
- **Impact:** How this affects the project

### Decisions Deferred
- **[Decision Name]:** Why it's deferred, when to revisit
```

#### Current Status
```markdown
### ✅ Completed

**Phase X: [Phase Name]**
- Completed task 1
- Completed task 2
- Key achievements

### 🔜 Next Steps

**Phase Y: [Next Phase]**
1. Next task 1
2. Next task 2

### 🚧 Blockers

- Blocker description and impact
- Steps to resolve
```

#### Key Learnings
```markdown
### What's Working

- Pattern/approach that's effective
- Why it's working well
- How to continue leveraging it

### Important Notes

- Important discovery or realization
- Context and implications
- How it affects future work

### Patterns to Follow

- Successful pattern to repeat
- When to use it
- Example or reference

### Pitfalls to Avoid

- Problem encountered
- Why it was problematic
- How to avoid in future
```

### 4. Keep It Current

Update metadata:
```markdown
**Status:** Phase [N] [Status] - [Brief description]
**Current Phase:** [Phase name and status]
**Last Updated:** [Today's date]
```

### 5. Maintain Structure

Keep CLAUDE.md organized:
- Clear section headers
- Concise but complete information
- Latest information first (within sections)
- Remove outdated information (or mark as superseded)

## Update Template

When adding new content, use these formats:

### New Phase Completion
```markdown
### ✅ Completed

**Phase N: [Phase Name]** (Completed: YYYY-MM-DD)
- Key accomplishment 1
- Key accomplishment 2
- Major features/changes
- Notable learnings
```

### New Decision
```markdown
**[Decision Topic]** (YYYY-MM-DD)
- **Chosen:** [The decision]
- **Rationale:** [Why]
- **Alternatives:** [What else was considered]
- **Impact:** [How this affects the project]
```

### New Learning
```markdown
### [Learning Title]
- **Context:** What prompted this learning
- **Discovery:** What was learned
- **Impact:** How it affects the project
- **Action:** What to do with this knowledge
```

## Quality Checks

Before saving updates:
- [ ] Status section is current
- [ ] Recent decisions are documented
- [ ] Learnings are captured
- [ ] Next steps are clear
- [ ] Blockers are noted (if any)
- [ ] Date is updated
- [ ] Phase information is accurate
- [ ] File structure is maintained

## What NOT to Do

Don't:
- ❌ Remove historical decisions (they provide context)
- ❌ Add vague or incomplete information
- ❌ Duplicate information already present
- ❌ Make it too verbose (keep it concise)
- ❌ Skip updating the date
- ❌ Forget to save the file

## Example Updates

### After Completing a Phase
```markdown
**Status:** Phase 2 Complete - Framework selected and initialized
**Current Phase:** Ready for Phase 3 - Content Modeling
**Last Updated:** 2025-11-05

### ✅ Completed

**Phase 2: Project Initialization** (Completed: 2025-11-05)
- Selected Astro as static site framework
- Initialized project with TypeScript configuration
- Set up basic project structure
- Created hello-world deployment to GitHub Pages
- Validated deployment pipeline works

### Decisions Made

**Static Site Framework: Astro** (2025-11-05)
- **Chosen:** Astro with React components
- **Rationale:** Best balance of performance, DX, and MDX support
- **Alternatives:** Next.js (too complex), VitePress (Vue-centric)
- **Trade-offs:** Newer ecosystem vs. maturity

### Next Steps

**Phase 3: Content Modeling**
1. Design content schema and frontmatter
2. Create directory structure
3. Set up MDX processing
4. Create example content
```

### After a Blocker
```markdown
### 🚧 Blockers

**GitHub Pages 404 on routes** (2025-11-05)
- Issue: Direct navigation to routes fails on GitHub Pages
- Cause: GitHub Pages doesn't support SPA-style routing
- Resolution: Need to implement fallback or use different routing
- Status: Investigating solutions
```

### After a Learning
```markdown
### Important Notes

**Build Output Structure**
- Discovered Astro requires specific base path configuration for GitHub Pages subpath deployment
- Must set `base: '/repo-name/'` in astro.config.mjs
- Affects asset paths and routing throughout the application
- Documented pattern in DevOps agent notes
```

## After Updating

1. Save the updated CLAUDE.md file
2. Review to ensure clarity and completeness
3. Commit if appropriate (usually with other changes)
4. Inform the user of significant updates

## Remember

CLAUDE.md is your persistent memory. Keep it:
- **Current:** Reflect the actual state
- **Complete:** Capture important decisions and learnings
- **Concise:** Dense with information, not verbose
- **Structured:** Easy to scan and find information
- **Historical:** Preserve decision context
- **Forward-looking:** Clear next steps

Update CLAUDE.md now with current project status.

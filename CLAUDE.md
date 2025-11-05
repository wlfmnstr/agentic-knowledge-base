# Agentic Knowledge Base - Project Memory

**Status:** Phase 2 Complete - Project Initialized and Deployed
**Current Phase:** Ready for Phase 3 - Content Modeling & Structure
**Last Updated:** 2025-11-05

---

## Project Vision

Build an internal company knowledge base and documentation site with these core characteristics:

- **Git-based content:** All content stored as markdown/MDX files in GitHub (no database)
- **Static site generation:** Fast, secure, version-controlled documentation
- **GitHub-centric workflow:** Leverage Actions for build/deploy, Pages for hosting, API for integrations
- **TypeScript-first:** Type safety throughout the application
- **Simple content editing:** Enable non-technical users to edit content elegantly (solution TBD)
- **Modern UX:** Search, theme switching, responsive design, clean interface

**Key Principle:** Start simple, extend as needed. This is an internal tool - no SEO, analytics, or social features required.

---

## Development Approach

### Iterative Development Model

This project follows an **agent-driven iterative development** approach:

1. **Small increments:** Build in focused phases, one feature at a time
2. **Test frequently:** Validate each increment before moving forward
3. **Adapt as we learn:** Technology and architecture decisions happen iteratively
4. **Context continuity:** CLAUDE.md serves as persistent memory across sessions
5. **Specialized agents:** Domain-specific subagents handle their areas of expertise
6. **Reusable patterns:** Skills capture knowledge that applies across features

### Project Phases (Planned)

- ✅ **Phase 1:** Agentic scaffolding setup
- ✅ **Phase 2:** Project initialization and technology selection
- 🔜 **Phase 3:** Content modeling and structure
- 📋 **Phase 4:** Core UI and layout
- 📋 **Phase 5:** Content features (search, navigation)
- 📋 **Phase 6:** Deployment pipeline
- 📋 **Phase 7:** Content authoring workflow
- 📋 **Phase 8:** Polish and refinement

---

## Architecture Decisions

### Decisions Made

**Phase 2 Technology Stack:**
- **Static Site Framework:** Astro v4.x
  - *Rationale:* Content-first architecture, TypeScript-native, excellent performance (ships zero JS by default), built-in Content Collections with type-safe schemas
- **Styling:** Tailwind CSS v3.x
  - *Rationale:* Rapid prototyping, utility-first approach, small production bundle, easy to extend later
- **Content Management:** Astro Content Collections + MDX + Zod
  - *Rationale:* Type-safe content with compile-time validation, catches errors during build
- **Deployment:** GitHub Actions → GitHub Pages
  - *Rationale:* Zero cost, integrated with source control, simple workflow
- **Repository:** Public (for now)
  - *Rationale:* Free GitHub Pages hosting, can move to private later if needed

### Decisions Deferred

- **Content editing solution:** Explicitly deferred until core system is working (Phase 7)
- **Search implementation:** Will evaluate options during Phase 5 (Pagefind recommended)
- **Component library:** May use shadcn/ui or Headless UI later if complex components needed
- **Theme system:** Basic dark/light mode planned for Phase 4

### Technology Constraints

- Must use TypeScript
- Must deploy to GitHub Pages
- Must use GitHub Actions for CI/CD
- Content must be markdown/MDX in git

---

## Current Status

### ✅ Completed

**Phase 1: Agentic Scaffolding**
- Created CLAUDE.md for persistent project memory
- Set up 6 specialized subagents (architect, frontend, content, devops, integration, reviewer)
- Created 5 skill packages for reusable knowledge
- Defined 5 workflow commands for common tasks
- Repository structure initialized

**Phase 2: Project Initialization**
- Evaluated static site frameworks (chose Astro over Next.js, VitePress, Gatsby)
- Initialized Astro v4 with TypeScript strict mode
- Configured Tailwind CSS for styling
- Set up Content Collections with Zod schemas for type-safe content
- Created base layouts (BaseLayout, DocLayout) and global styles
- Created sample MDX documentation pages (index, getting-started)
- Configured GitHub Actions deployment workflow
- Successfully tested production build
- Documented all technology decisions and rationale

### 🔜 Next Steps

**Phase 3: Content Modeling & Structure**
1. Design comprehensive content schema (expand beyond current base schema)
2. Create content authoring guidelines and templates
3. Build navigation generation system (auto-generate sidebar from content)
4. Add breadcrumbs and prev/next navigation
5. Create additional example pages across different categories
6. Test content organization patterns

### 🚧 Blockers

None currently.

---

## Key Learnings

### What's Working

- **Agentic structure established:** Clear separation of concerns across subagents
- **Skills-based knowledge:** Reusable patterns ready to support development
- **Workflow automation:** Commands available for common tasks
- **Memory persistence:** CLAUDE.md provides continuity across sessions
- **Astro Content Collections:** Type-safe content validation catches errors at build time
- **Incremental development:** Small iterations working well - project initialized in ~2 hours

### Important Notes

- **Application structure:** Clean separation between layouts, pages, and content
- **Build validation:** Type checking and content validation happen before deployment
- **MDX gotchas:** Escaped backticks don't work in MDX - use actual code blocks instead
- **Content editing deferred:** Explicitly saved for later - focus on core functionality first
- **Internal tool focus:** No need for SEO, analytics, or social features

### Technical Details

**Project Structure:**
```
src/
├── content/         # Type-safe MDX content
│   ├── config.ts    # Zod schemas
│   └── docs/        # Documentation pages
├── layouts/         # Page layouts
│   ├── BaseLayout.astro
│   └── DocLayout.astro
├── pages/           # Routes
│   ├── index.astro
│   └── docs/
│       ├── index.astro
│       └── [...slug].astro
└── styles/          # Global CSS
    └── global.css
```

**URLs:**
- Homepage: `/`
- Docs index: `/docs`
- Individual pages: `/docs/{slug}`
- All routes include base path: `/agentic-knowledge-base/`

### Patterns to Follow

- **Update CLAUDE.md regularly:** Keep this file current with decisions, learnings, and status
- **Use /update-context command:** Convenient workflow for updating this file
- **Invoke subagents for domain work:** Let specialists handle their areas
- **Reference skills:** Auto-invoke when relevant technology is in play
- **Document decisions:** Capture "why" not just "what" for architecture choices

---

## Subagent Responsibilities

- **Architect:** System design, technology evaluation, integration patterns, high-level decisions
- **Frontend:** UI/UX implementation, components, styling, themes, responsive design
- **Content:** Content structure, MDX processing, schemas, organization patterns
- **DevOps:** CI/CD pipelines, GitHub Actions, deployment, build optimization
- **Integration:** Feature integration, cross-concern coordination, testing strategy
- **Reviewer:** Code quality, documentation review, testing validation, best practices

---

## Quick Reference

### Starting a New Phase
```bash
/plan-phase
```

### Creating a Feature
```bash
/spec [feature-name]
# Implement the feature
/review
/integrate
```

### Updating Context
```bash
/update-context
```

### Technology Questions
Ask the **Architect** subagent for system design and technology decisions.

### Implementation Questions
Ask the relevant domain subagent (Frontend, Content, DevOps).

---

## Important Reminders

- **Git workflow:** Develop on feature branches, commit frequently, push when complete
- **Test before commit:** Validate changes work before committing
- **Document decisions:** Update CLAUDE.md with significant choices and learnings
- **Small iterations:** Build incrementally, don't try to do everything at once
- **Ask for help:** User input is valuable - ask when uncertain about direction

---

*This file is the project's persistent memory. Keep it updated with decisions, learnings, status changes, and next steps.*

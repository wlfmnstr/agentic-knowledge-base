---
description: Plan the next development phase with detailed tasks and approach
---

# Plan Development Phase

You are planning the next development phase for the knowledge base project.

## Your Task

Create a detailed plan for the upcoming phase of development. This plan should be actionable, specific, and consider the project's current state.

## Planning Process

### 1. Review Current State

First, review context:
- Read **CLAUDE.md** to understand current status
- Check what phase we're in
- Review previous decisions and learnings
- Identify any blockers or dependencies

### 2. Define Phase Goals

What are we trying to achieve in this phase?

**Phase Name:** [Clear, descriptive name]

**Objectives:**
- Primary goal(s)
- Success criteria
- What "done" looks like

**Scope:**
- What's included
- What's explicitly excluded (for later phases)

### 3. Break Down into Tasks

Create specific, actionable tasks:

**Task Structure:**
```markdown
### Task: [Task Name]

**What:** Clear description of the task
**Why:** Why this task is needed
**How:** High-level approach
**Owner:** Which agent(s) should handle this
**Dependencies:** What must be done first
**Estimate:** Rough complexity (small/medium/large)
**Success Criteria:** How to verify completion
```

### 4. Consider Technical Decisions

Identify decisions that need to be made:

**Decisions Needed:**
1. Decision point 1
   - Options: A, B, C
   - Recommendation: [Option] because [rationale]
   - Who decides: Architect / User
2. Decision point 2
   - ...

### 5. Risk Assessment

**Potential Risks:**
- Risk 1: Description
  - Impact: High/Medium/Low
  - Likelihood: High/Medium/Low
  - Mitigation: Strategy to address
- Risk 2: ...

### 6. Agent Coordination

**Agent Involvement:**
- **Architect:** For decisions about [...]
- **Frontend:** For implementing [...]
- **Content:** For designing [...]
- **DevOps:** For setting up [...]
- **Integration:** For coordinating [...]
- **Reviewer:** For reviewing [...]

### 7. Deliverables

What will exist at the end of this phase?

**Artifacts:**
- [ ] Code/files created
- [ ] Documentation written
- [ ] Tests added
- [ ] Deployment configurations
- [ ] Updated CLAUDE.md

### 8. Timeline Estimate

**Rough Timeline:**
- Task 1: [X sessions / time estimate]
- Task 2: [X sessions / time estimate]
- Total: [Overall estimate]

Note: These are estimates for planning purposes.

## Phase Plan Template

```markdown
# Phase [N]: [Phase Name]

## Status
Phase: [N] | Status: Planning | Date: [Date]

## Objectives
- Primary objective
- Secondary objectives
- Success criteria

## Current Context
- What's been done already
- Current state of the project
- Relevant decisions from CLAUDE.md

## Tasks

### 1. [Task Name] (Priority: High/Medium/Low)
**Description:** What needs to be done
**Agent:** Which agent should handle this
**Approach:** How to approach this
**Dependencies:** Prerequisites
**Success Criteria:** Definition of done

### 2. [Next Task]
...

## Technical Decisions

### Decision 1: [Topic]
**Question:** What needs to be decided?
**Options:**
- Option A: Pros/Cons
- Option B: Pros/Cons
**Recommendation:** [Choice] because [rationale]

## Risks & Mitigations
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| [Risk description] | H/M/L | H/M/L | [Strategy] |

## Agent Coordination
- Architect: [Responsibilities]
- Frontend: [Responsibilities]
- Content: [Responsibilities]
- DevOps: [Responsibilities]
- Integration: [Responsibilities]

## Deliverables
- [ ] Deliverable 1
- [ ] Deliverable 2
- [ ] Updated CLAUDE.md

## Timeline Estimate
- Task 1: [Estimate]
- Task 2: [Estimate]
- **Total:** [Overall estimate]

## Next Steps
1. First step to take
2. Second step
3. ...
```

## After Planning

1. **Save the plan:** Create `docs/plans/phase-[N]-[name].md`
2. **Update CLAUDE.md:**
   - Change current phase status
   - Reference the plan document
   - Note key decisions
3. **Review with user:** Present plan for approval
4. **Proceed:** Once approved, begin executing tasks

## Example Usage

```bash
# Plan the next phase
/plan-phase

# Plan a specific phase
/plan-phase "Content Modeling"
```

## Planning Principles

- **Start with why:** Clearly state objectives
- **Be specific:** Vague tasks lead to confusion
- **Consider dependencies:** Order tasks logically
- **Estimate realistically:** Better to over-estimate
- **Identify risks early:** Plan mitigation strategies
- **Assign ownership:** Clear agent responsibilities
- **Define success:** Know what "done" looks like
- **Stay flexible:** Plans can adapt as you learn

## Collaboration

Consult relevant agents:
- **Architect** for technical planning and decisions
- **Domain agents** for task breakdown in their areas
- **Integration agent** for coordination planning

## Remember

This plan is a guide, not a contract. It should:
- Provide clarity and direction
- Help track progress
- Surface decisions early
- Identify dependencies and risks
- Be adaptable to changes

Start planning the next phase now.

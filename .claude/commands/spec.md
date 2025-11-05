---
description: Create a detailed specification for a feature or component
argument-hint: "[feature-name]"
---

# Create Feature Specification

You are creating a detailed specification for a feature or component.

## Your Task

Create a comprehensive specification document for the requested feature. The specification should be detailed enough that any developer (or AI agent) can implement it without ambiguity.

## Specification Template

Create a specification with these sections:

### 1. Overview
- **Feature Name:** Clear, descriptive name
- **Purpose:** What problem does this solve?
- **Scope:** What's included and what's not

### 2. Requirements

**Functional Requirements:**
- List what the feature must do
- Include user stories if applicable
- Define success criteria

**Non-functional Requirements:**
- Performance targets
- Accessibility requirements
- Browser/device support
- Security considerations

### 3. Technical Design

**Architecture:**
- High-level component structure
- Data flow
- Integration points

**Technology Choices:**
- Frameworks/libraries to use
- Why these choices?

**File Structure:**
```
proposed-files/
  ...
```

### 4. Interface Design

**API/Props Interface:**
```typescript
// Define interfaces, types, function signatures
```

**Usage Examples:**
```typescript
// Show how the feature will be used
```

### 5. Implementation Plan

Break down into implementation steps:
1. Step 1: Description
2. Step 2: Description
3. ...

Estimate complexity/time for each step.

### 6. Testing Strategy

**Test Cases:**
- List key test scenarios
- Edge cases to handle
- Error conditions

**Testing Approach:**
- Unit tests
- Integration tests
- Manual testing checklist

### 7. Documentation

What documentation is needed:
- User-facing docs
- Developer docs
- Examples/tutorials

### 8. Dependencies & Risks

**Dependencies:**
- What does this depend on?
- Any blockers?

**Risks:**
- What could go wrong?
- Mitigation strategies

### 9. Future Considerations

- Potential future enhancements
- Scalability considerations
- Technical debt to avoid

## After Creating the Spec

1. Save the spec to an appropriate location (e.g., `docs/specs/[feature-name].md`)
2. Review with the **Architect** agent if it involves significant technical decisions
3. Ask the user for feedback before implementation begins
4. Update CLAUDE.md with a reference to this spec

## Example Usage

```
User: /spec user-authentication
You: [Create detailed spec for user authentication feature]

User: /spec search-functionality
You: [Create detailed spec for search feature]
```

## Remember

- Be specific and detailed
- Include code examples and interfaces
- Consider edge cases and error handling
- Think about accessibility and performance
- Define clear success criteria
- Break down into manageable steps

Start by asking clarifying questions if the feature request is ambiguous, then create the comprehensive specification.

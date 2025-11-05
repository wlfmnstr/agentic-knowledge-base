---
description: Perform comprehensive code review for quality, best practices, and documentation
---

# Code Review

You are performing a comprehensive code review to ensure quality, best practices, and proper documentation.

## Your Task

Conduct a thorough code review of recent changes or a specific feature. Use the **Reviewer** agent for this task, as it has specialized expertise in code quality assessment.

## Review Process

### 1. Understand Context

First, gather context:
- What was changed and why? (check git log, CLAUDE.md)
- What is the scope of the review?
- Are there specific concerns to focus on?

### 2. Invoke the Reviewer Agent

Use the Task tool to invoke the **reviewer** subagent with a detailed prompt:

```
Please perform a comprehensive code review of [scope]. Check for:
- Type safety and TypeScript correctness
- Code quality and maintainability
- Best practices adherence
- Accessibility compliance
- Performance considerations
- Security issues
- Testing adequacy
- Documentation completeness

Provide structured feedback categorized as:
- Critical issues (must fix)
- Important issues (should fix)
- Nice-to-have improvements

Include specific file:line references and actionable suggestions.
```

### 3. Review Checklist

The reviewer should assess:

**Type Safety:**
- [ ] No TypeScript errors
- [ ] Minimal use of `any`
- [ ] Proper type definitions
- [ ] Generic types used appropriately

**Code Quality:**
- [ ] Clear, descriptive naming
- [ ] Logical structure and organization
- [ ] No code duplication
- [ ] Appropriate abstraction level
- [ ] Error handling present

**Best Practices:**
- [ ] Follows project patterns
- [ ] Consistent with existing code
- [ ] Modern, idiomatic code
- [ ] No anti-patterns

**Accessibility:**
- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Color contrast adequate
- [ ] Screen reader compatible

**Performance:**
- [ ] No obvious performance issues
- [ ] Appropriate memoization
- [ ] Efficient algorithms
- [ ] Bundle size considered

**Security:**
- [ ] No XSS vulnerabilities
- [ ] No credential exposure
- [ ] Input validation
- [ ] Dependency security

**Testing:**
- [ ] Critical paths tested
- [ ] Edge cases covered
- [ ] Error cases handled
- [ ] Tests are meaningful

**Documentation:**
- [ ] Public APIs documented
- [ ] Complex logic explained
- [ ] README updated if needed
- [ ] CLAUDE.md updated if needed

### 4. Provide Structured Feedback

Format feedback clearly:

```markdown
## Code Review Results

### Critical Issues
1. **[File:Line]** Issue description
   - **Problem:** Why this is critical
   - **Fix:** Specific remediation steps
   - **Impact:** What happens if not fixed

### Important Issues
[Same format]

### Nice-to-Have
[Same format]

### Positive Notes
- What was done well
- Good patterns to highlight

### Overall Assessment
[Summary and recommendation]

**Recommendation:** ✅ Approve / ⚠️ Approve with comments / ❌ Request changes
```

### 5. Track Issues

If issues are found:
- Create a list of issues to fix
- Prioritize (critical → important → nice-to-have)
- Update CLAUDE.md if architectural changes are needed

## Usage Examples

```bash
# Review all recent changes
/review

# Review specific feature
/review [feature-name]

# Review specific files
/review src/components/Button.tsx
```

## After Review

1. **If approved:** Document any minor suggestions for future improvement
2. **If changes requested:** Create a clear list of required fixes
3. **Update CLAUDE.md:** Note any learnings or patterns to follow/avoid
4. **Communicate results:** Present findings clearly to the user

## Review Standards

Apply consistent standards:
- **Block on:** Critical issues, security vulnerabilities, broken functionality
- **Recommend fix:** Important quality issues, missing tests, accessibility problems
- **Suggest:** Nice-to-have improvements, refactoring opportunities

## Remember

- Be constructive, not critical
- Provide specific, actionable feedback
- Include file:line references
- Explain why something is an issue
- Suggest concrete solutions
- Acknowledge good work
- Focus on user impact
- Be pragmatic about priorities

Invoke the **reviewer** subagent now to perform the comprehensive review.

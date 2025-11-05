---
description: Plan and execute integration of a new feature into the system
---

# Integrate Feature

You are planning and executing the integration of a new feature into the existing system.

## Your Task

Coordinate the integration of a new feature, ensuring it works cohesively with the existing system. Use the **Integration** agent for this task.

## When to Use This Command

Use when:
- ✅ A new feature is ready to integrate
- ✅ Multiple components need to work together
- ✅ Cross-cutting concerns need coordination (search, theme, nav)
- ✅ You need to validate end-to-end functionality
- ✅ Testing across system boundaries is needed

## Integration Process

### 1. Understand the Feature

First, gather information:
- What feature is being integrated?
- Where was it developed/documented?
- What components does it include?
- What does it depend on?

### 2. Identify Integration Points

Map out where the feature touches the system:

**Integration Points:**
- [ ] **Routing:** New pages/routes to add
- [ ] **Navigation:** Menu/sidebar updates
- [ ] **Data flow:** How data enters/exits the feature
- [ ] **Styling:** Theme integration
- [ ] **State:** Shared state management
- [ ] **APIs:** External APIs or internal APIs
- [ ] **Build:** Build process changes
- [ ] **Configuration:** Config file updates
- [ ] **Dependencies:** New packages needed

### 3. Invoke the Integration Agent

Use the Task tool to invoke the **integration** subagent:

```
Please integrate the [feature-name] into the system. The feature includes [description].

Integration points to consider:
- Routing: [details]
- Navigation: [details]
- Data flow: [details]
- Other points: [details]

Please:
1. Plan the integration sequence
2. Integrate step by step
3. Test at each integration point
4. Run end-to-end tests
5. Report any issues or gaps found
6. Provide integration summary
```

### 4. Integration Checklist

Verify all integration aspects:

**Functionality:**
- [ ] Feature works in isolation
- [ ] Feature works in system context
- [ ] Data flows correctly
- [ ] Error handling works
- [ ] Edge cases handled

**UI/UX:**
- [ ] Styling is consistent with system
- [ ] Theme switching works (if applicable)
- [ ] Responsive design maintained
- [ ] Accessible (keyboard nav, screen readers)
- [ ] Loading states handled

**Navigation:**
- [ ] Routes registered correctly
- [ ] Navigation menu updated
- [ ] Breadcrumbs work (if applicable)
- [ ] Deep linking works
- [ ] Back/forward navigation works

**Performance:**
- [ ] No performance regressions
- [ ] Code splitting configured
- [ ] Assets optimized
- [ ] Loading time acceptable

**Testing:**
- [ ] Unit tests pass
- [ ] Integration tests added
- [ ] End-to-end workflows tested
- [ ] Manual testing completed

**Documentation:**
- [ ] Code documented
- [ ] User docs updated
- [ ] CLAUDE.md updated
- [ ] Examples provided

**Build & Deploy:**
- [ ] Build succeeds
- [ ] No type errors
- [ ] No lint errors
- [ ] Deployment works

### 5. Integration Steps

Typical integration sequence:

**Step 1: Prepare**
- Review feature implementation
- Identify all integration points
- Plan integration order

**Step 2: Register (Routing, Nav, etc.)**
- Add routes to router
- Update navigation menu
- Register any global components

**Step 3: Connect Data**
- Wire up data sources
- Connect to APIs
- Set up state management

**Step 4: Style Integration**
- Apply theme variables
- Ensure consistency
- Test theme switching

**Step 5: Test Integration Points**
- Test routing works
- Test navigation works
- Test data flow
- Test styling

**Step 6: End-to-End Testing**
- Test full user workflows
- Test error cases
- Test edge cases
- Manual testing

**Step 7: Performance Check**
- Check build size
- Check loading time
- Check runtime performance

**Step 8: Documentation**
- Update docs
- Update CLAUDE.md
- Add examples

### 6. Testing Workflows

Define and test key user workflows:

**Workflow 1: [Workflow Name]**
1. User does X
2. System does Y
3. User sees Z
4. ✅ Verified

**Workflow 2: [Workflow Name]**
...

### 7. Issue Tracking

If issues are found during integration:

**Integration Issues:**
1. **Issue:** [Description]
   - **Severity:** Critical / Important / Minor
   - **Location:** [Where it occurs]
   - **Fix:** [What needs to be done]
   - **Owner:** [Which agent should fix]

### 8. Integration Report

After integration, provide a summary:

```markdown
## Integration Report: [Feature Name]

### Summary
[Brief overview of what was integrated]

### Integration Points
- ✅ Routing: [Details]
- ✅ Navigation: [Details]
- ✅ Data flow: [Details]
- ✅ Styling: [Details]
- ✅ Testing: [Details]

### Issues Found
1. [Issue and resolution]
2. [Issue and resolution]

### Testing Summary
- Unit tests: [X passing]
- Integration tests: [X passing]
- E2E workflows: [X tested, all working]

### Performance Impact
- Build size: [Before/After]
- Load time: [Acceptable/Issues]

### Status
✅ Integration complete and verified
OR
⚠️ Integration complete with noted issues
OR
❌ Integration blocked on [issue]

### Next Steps
- [ ] Next step if needed
```

## Example Usage

```bash
# Integrate a new feature
/integrate search-functionality

# Integrate after development
/integrate [feature-name]
```

## Coordination with Agents

The Integration agent may need to:
- **Request Frontend agent:** Fix styling inconsistencies
- **Request Content agent:** Adjust data structure
- **Request DevOps agent:** Update build configuration
- **Request Reviewer:** Validate integration quality

## Success Criteria

Integration is successful when:
- ✅ Feature works correctly in system context
- ✅ No breaking changes to existing features
- ✅ All integration points verified
- ✅ Testing passes
- ✅ Performance is acceptable
- ✅ Documentation is updated

## Common Integration Patterns

### Adding a New Page
1. Create page component
2. Add route to router config
3. Add navigation link
4. Test navigation
5. Test deep linking

### Adding a Global Feature (Search, Theme)
1. Create provider/context
2. Wrap app in provider
3. Integrate in relevant components
4. Test across all pages
5. Verify no conflicts

### Adding an API Integration
1. Create API client
2. Add to data layer
3. Connect to UI
4. Handle errors
5. Test all states (loading, success, error)

## Remember

Integration is about:
- **Cohesion:** Making parts work together smoothly
- **Testing:** Verifying system-wide functionality
- **Coordination:** Working across agent domains
- **Quality:** Maintaining high standards
- **Documentation:** Capturing integration patterns

Invoke the **integration** subagent now to coordinate the feature integration.

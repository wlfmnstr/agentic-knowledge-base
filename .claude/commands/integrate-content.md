---
description: "Integrate staged content into the production knowledge base"
argument-hint: "[staging-file]"
---

# Content Integration Workflow

You are facilitating the integration of staged content from the landing zone into the production knowledge base.

## Your Task

Help move content from `src/content/staging/` to `src/content/docs/` with proper validation, categorization, linking, and traceability.

## Process

### Step 1: Identify Staging Content

If a specific file is provided, work with that. Otherwise:

1. List all files in `src/content/staging/`
2. Show their status (new/reviewed/ready/integrated)
3. Ask the user which content they want to integrate

### Step 2: Validate Integration Readiness

Before integrating, check:

**Content Quality Checks:**
- [ ] Title is clear and descriptive
- [ ] Description accurately summarizes content
- [ ] Content is well-structured with appropriate headings
- [ ] Technical accuracy verified (ask user if uncertain)
- [ ] Source brain dump is referenced

**Categorization Checks:**
- [ ] Target category is identified (or needs to be determined)
- [ ] Tags are relevant and consistent
- [ ] Related topics are identified

**Duplication Checks:**
- [ ] Search docs for similar content
- [ ] If duplicate exists, determine: merge or keep separate?
- [ ] If merging, plan merge strategy

**Status Check:**
- [ ] Status is 'ready' or explain why not
- [ ] If not ready, list what needs to be done
- [ ] Ask user if they want to proceed anyway

### Step 3: Plan the Integration

**Determine Placement:**
- Ask user which category in docs (or suggest based on targetCategory)
- Suggest a slug based on title
- Show the final path: `src/content/docs/{category}/{slug}.mdx`

**Identify Cross-Links:**
- Search for related content in docs
- Suggest bidirectional links to add
- Note which documents should reference this new content

**Prepare Content Updates:**
- Update frontmatter for docs collection schema
- Add source attribution section if valuable
- Update any internal references

### Step 4: Execute the Integration

1. **Create the docs entry:**
   - Copy staged content to docs location
   - Update frontmatter to match docs schema
   - Add source reference at bottom if useful for context
   - Save the file

2. **Update staging entry:**
   - Change status to 'integrated'
   - Add integrationNotes with target location
   - Update extractedDate to current date/time

3. **Update source brain dump:**
   - Verify the brain dump is correctly referenced
   - Ensure bidirectional linking is maintained

4. **Add cross-links:**
   - Update related docs with links to new content
   - Ensure navigation will include the new page

### Step 5: Verify and Report

1. **Test the build:**
   - Run `npm run build` to verify no errors
   - Check that content renders correctly
   - Validate all links work

2. **Report to user:**
   - Show what was created: docs location
   - Show what was updated: staging status, related docs
   - Provide the URL path for the new page
   - List any follow-up actions needed

## Output Format

Provide a summary in this format:

```markdown
## Integration Complete ✅

**New Document:** `src/content/docs/{category}/{slug}.mdx`
**URL:** `/docs/{category}/{slug}`

**Updated Files:**
- `src/content/staging/{original}.mdx` → status: integrated
- `src/content/brain-dumps/{source}.mdx` → reference maintained
- [Any other updated docs for cross-linking]

**Source:** Originally from `{brain-dump-file}` captured on {date}

**Next Steps:**
- [ ] Review the rendered page at the URL above
- [ ] Consider adding navigation links if needed
- [ ] Archive staging entry if desired (or keep for history)
```

## Special Cases

### Merging with Existing Content

If content should be merged rather than created new:

1. Show the existing doc and the staged content
2. Ask user how to merge (append, prepend, integrate sections)
3. Perform the merge carefully
4. Mark staging as integrated with note about merge
5. Keep full history in staging for reference

### Splitting Staging Content

If staged content should become multiple docs:

1. Ask user how to split
2. Create multiple docs entries
3. Update staging to reference all created docs
4. Ensure cross-links between the split pieces

### Partial Integration

If only part of staging content is ready:

1. Integrate the ready portion
2. Leave remaining content in staging
3. Update staging with notes about what was integrated
4. Create new staging entry for remaining content if appropriate

## Remember

- **Preserve traceability:** Always maintain links back to source
- **Validate before moving:** Check for duplicates and quality
- **Update all references:** Keep the web of links consistent
- **Test the build:** Integration should never break the build
- **Ask when uncertain:** Better to clarify than make wrong assumptions
- **Keep staging history:** Don't delete staged content after integration

## Invoking the Brain Dump Skill

When working with staging content, automatically reference the **brain-dump-ingestion** skill for context on:
- How content was structured during extraction
- What the staging schemas mean
- Best practices for maintaining traceability
- Understanding the landing zone architecture

Use the Skill tool to invoke it when needed for reference.

---

*Integration is about carefully curating the knowledge base while honoring the work done during extraction.*

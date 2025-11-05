---
description: "Ingest and process a brain dump into the landing zone"
argument-hint: "[source-type]"
---

# Brain Dump Ingestion Command

You are facilitating the capture and processing of a brain dump into structured staged content.

## Your Task

Guide the user through capturing a brain dump, analyzing it, extracting atomic topics, and creating staging entries—all while preserving the original content.

## Process

### Step 1: Capture the Brain Dump

**Ask the user for:**
1. **Content:** The raw brain dump text
   - "Please share your brain dump (paste transcribed audio, your notes, or stream-of-consciousness text)"

2. **Source type:** How was this captured?
   - Options: `audio`, `text`, `transcript`, `conversation`
   - "How was this content captured? (audio/text/transcript/conversation)"

3. **Duration** (if audio/video):
   - "How long was the recording?" (optional)

4. **Brief title:**
   - "What's a brief description of this dump? (5-8 words)"
   - Generate a suggested title if user doesn't provide

### Step 2: Save the Raw Dump

**Create the brain dump file:**

File path: `src/content/brain-dumps/{YYYY-MM-DD-slug}.mdx`

```markdown
---
title: "Brief description"
date: {current-date-time}
source: "{source-type}"
duration: "{duration}"  # if applicable
tags: []  # suggest broad tags after analysis
processed: false
---

{raw-content-exactly-as-provided}
```

**File naming:**
- Use today's date: `YYYY-MM-DD`
- Generate slug from title: lowercase, hyphens
- Example: `2025-11-05-auth-pattern-thoughts.mdx`

**Tell the user:**
- "✅ Saved raw brain dump to `{file-path}`"
- "Now analyzing content for extraction..."

### Step 3: Analyze the Content

**Invoke the brain-dump-ingestion skill** for processing guidance.

**Analyze for:**

1. **Content Type:**
   - Stream of consciousness / Narrative / Problem-solving / Knowledge capture / Ideation / Meeting notes
   - Tell user: "This appears to be {type}"

2. **Topic Density:**
   - How many distinct topics? (count them)
   - What's the main focus?
   - Are there clear topic boundaries or smooth transitions?
   - Tell user: "I've identified {N} distinct topics"

3. **Extraction Potential:**
   - What could become standalone documentation?
   - List the potential topics as bullet points
   - Ask: "Do these extractions look right? Any you'd like to add, remove, or modify?"

### Step 4: Extract Topics

For each topic to extract:

1. **Ask for confirmation on the topic:**
   - Show suggested title
   - Show suggested description
   - Ask user to approve or modify

2. **Create staging entry:**

File path: `src/content/staging/{topic-slug}.mdx`

```markdown
---
title: "{topic-title}"
description: "{clear-one-sentence-summary}"
sourceFile: "brain-dumps/{brain-dump-file}"
extractedDate: {current-date-time}
targetCategory: "{suggested-category}"  # optional
status: "new"
tags: [{relevant-tags}]
relatedTopics: []  # can be added during review
---

{structured-content-extracted-from-dump}

---

## Source Context

This content was extracted from a brain dump recorded on {date}.
See the [original brain dump](/brain-dumps/{slug}) for full context.
```

3. **Structure the content:**
   - Apply appropriate template from skill
   - Clean up narrative artifacts
   - Organize with clear headings
   - Preserve valuable examples and insights

4. **Report to user:**
   - "✅ Created `src/content/staging/{slug}.mdx`"
   - Show a brief preview of the structured content

### Step 5: Update References

**Update the brain dump file** with extraction tracking:

```markdown
---
processed: true
tags: [{refined-tags-based-on-content}]
stagedItems:
  - "staging/{slug1}.mdx"
  - "staging/{slug2}.mdx"
  - "staging/{slug3}.mdx"
---
```

**Tell the user:**
- "✅ Updated brain dump with extraction references"

### Step 6: Summary & Next Steps

**Provide a summary:**

```markdown
## Ingestion Complete ✅

**Brain Dump Saved:** `src/content/brain-dumps/{file}.mdx`

**Staged Content Created:**
1. `src/content/staging/{slug1}.mdx` - {title1}
2. `src/content/staging/{slug2}.mdx` - {title2}
3. `src/content/staging/{slug3}.mdx` - {title3}

**Next Steps:**
- Review the staged content for quality and accuracy
- Refine structure or add details as needed
- When ready, use `/integrate-content` to move to production docs
- Original brain dump is preserved for future reference

**Quick Actions:**
- Edit staging entries: They're in `src/content/staging/`
- Review brain dump: `src/content/brain-dumps/{file}.mdx`
- Integrate content: `/integrate-content {staging-file}`
```

## Extraction Strategies

### Generous Extraction (Default)

Extract liberally into multiple smaller pieces:
- Better to have more focused entries than fewer large ones
- Easier to merge later than to split
- Each piece can evolve independently

### Conservative Extraction

Keep related concepts together:
- When concepts are tightly coupled
- When narrative flow is important
- When context is critical for understanding

**Ask the user:** "Would you like generous extraction (more smaller pieces) or conservative extraction (fewer larger pieces)?"

## Quality Checks

Before creating staging entries, verify:
- [ ] Content is extracted cleanly (no broken sentences)
- [ ] Each topic can stand alone
- [ ] Titles are descriptive and clear
- [ ] Descriptions accurately summarize
- [ ] Source references are correct
- [ ] Appropriate structure template is applied

## Special Cases

### Very Short Dumps (< 200 words)

- May extract as single staging entry
- Or ask user if this should go directly to docs
- "This is a short, focused dump. Create a single staging entry or go straight to docs?"

### Very Long Dumps (> 5000 words)

- Suggest breaking into 5-8 major topics
- May need multiple passes
- "This is a substantial dump. I'll extract the major topics first, then we can do a second pass for details if needed."

### Mixed Quality Content

- Extract high-quality parts first
- Flag lower-quality sections for review
- "Some sections are clearer than others. I'll extract the strong content first and we can revisit the rest."

### Transcripts with Multiple Speakers

- Consider extracting by speaker perspective
- Or by topic across speakers
- "This transcript has multiple perspectives. Extract by speaker or by unified topics?"

## Remember

- **Always save the raw dump first** - Never lose original content
- **Preserve authenticity** - Don't over-edit during extraction
- **Ask for guidance** - When extraction approach is unclear
- **Use the skill** - Reference brain-dump-ingestion skill for patterns
- **Show your work** - Let user see what's being created
- **Iterate if needed** - Extraction can be refined after initial pass

## Automatic Skill Invocation

This command automatically invokes the **brain-dump-ingestion** skill. Use it for:
- Understanding content types
- Applying structure templates
- Following extraction best practices
- Maintaining traceability

---

*Ingestion is about transforming raw thought into structured knowledge while keeping the original spark alive.*

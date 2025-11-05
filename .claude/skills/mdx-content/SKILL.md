---
name: mdx-content
description: Working with markdown, MDX, frontmatter, and content processing patterns
---

# MDX & Content Processing Skill

Expert knowledge for working with Markdown, MDX, and content processing.

## Markdown Basics

### Standard Markdown

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

[Link text](https://example.com)

![Image alt](./image.png)

- Unordered list
- Another item

1. Ordered list
2. Second item

> Blockquote

`inline code`

\`\`\`javascript
// code block
const foo = 'bar';
\`\`\`
```

### GitHub Flavored Markdown (GFM)

Extended features:
- ✅ Task lists
- Tables
- Strikethrough with `~~text~~`
- Automatic URL linking
- Syntax highlighting

## MDX Fundamentals

MDX = Markdown + JSX/Components

### Basic MDX

```mdx
---
title: My Document
date: 2025-01-05
---

# {frontmatter.title}

This is regular markdown.

<CustomButton onClick={() => alert('Hi!')}>
  Click me
</CustomButton>

You can mix markdown and components seamlessly!
```

### Importing in MDX

```mdx
import { Chart } from './components/Chart';
import data from './data.json';

# Data Visualization

<Chart data={data} />
```

### Expressions in MDX

```mdx
export const author = "Alice";

Written by {author} on {new Date().toLocaleDateString()}

{/* Comments work like JSX */}
```

## Frontmatter

YAML metadata at the top of markdown files:

### Basic Frontmatter

```yaml
---
title: Getting Started
description: Learn the basics
date: 2025-01-05
author: Jane Doe
tags: [tutorial, beginner]
draft: false
---
```

### Common Frontmatter Fields

**Required (typically):**
- `title`: Page title
- `description`: Short description

**Common optional:**
- `date`: Publication date
- `author`: Author name
- `tags`: Array of tags
- `category`: Category
- `draft`: Draft status (boolean)
- `order`: Sort order (number)
- `slug`: Custom URL slug

**Custom fields:**
- `sidebar`: Sidebar configuration
- `layout`: Layout variant
- `image`: Hero/og image
- Anything your site needs!

### Frontmatter Schema Validation

Define schemas for type safety:

```typescript
import { z } from 'zod';

const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().default(false),
  author: z.string().optional(),
});

type Frontmatter = z.infer<typeof frontmatterSchema>;
```

## Content Processing

### Remark (Markdown processing)

Remark plugins transform markdown AST:

**Common remark plugins:**
- `remark-gfm`: GitHub Flavored Markdown
- `remark-toc`: Generate table of contents
- `remark-math`: Math support (KaTeX/MathJax)
- `remark-footnotes`: Footnote support
- `remark-frontmatter`: Parse frontmatter

### Rehype (HTML processing)

Rehype plugins transform HTML AST:

**Common rehype plugins:**
- `rehype-slug`: Add IDs to headings
- `rehype-autolink-headings`: Make headings clickable
- `rehype-pretty-code`: Syntax highlighting (Shiki)
- `rehype-sanitize`: Sanitize HTML
- `rehype-external-links`: Handle external links

### Example Plugin Configuration

```javascript
// Astro example
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    }),
  ],
});
```

## Syntax Highlighting

### Shiki (Recommended)

Accurate, beautiful syntax highlighting:

```javascript
import { defineConfig } from 'astro/config';
import rehypePrettyCode from 'rehype-pretty-code';

export default defineConfig({
  markdown: {
    rehypePlugins: [
      [rehypePrettyCode, {
        theme: 'github-dark',
        onVisitLine(node) {
          // Line customization
        },
      }],
    ],
  },
});
```

Supports:
- Multiple themes (light/dark)
- Line highlighting
- Line numbers
- File names
- Diff highlighting

### Code Block Features

```markdown
\`\`\`javascript title="example.js" {3-5}
// Line 1
// Line 2
// Lines 3-5 are highlighted
// Line 4
// Line 5
\`\`\`
```

## Custom Components in MDX

### Providing Components

Make components available in MDX:

```typescript
// MDXProvider or similar
const components = {
  h1: CustomH1,
  h2: CustomH2,
  code: CustomCode,
  pre: CustomPre,
  Callout: CalloutComponent,
  Chart: ChartComponent,
};
```

### Component Patterns

**Callout/Admonition:**
```mdx
<Callout type="warning">
  Be careful with this!
</Callout>
```

**Tabs:**
```mdx
<Tabs>
  <Tab label="JavaScript">
    \`\`\`js
    const foo = 'bar';
    \`\`\`
  </Tab>
  <Tab label="TypeScript">
    \`\`\`ts
    const foo: string = 'bar';
    \`\`\`
  </Tab>
</Tabs>
```

**Code with output:**
```mdx
<CodeWithOutput>
  <Code>
    \`\`\`js
    console.log('Hello');
    \`\`\`
  </Code>
  <Output>
    Hello
  </Output>
</CodeWithOutput>
```

## Content Organization

### Directory Structure

```
content/
  docs/
    index.md
    getting-started.md
    api/
      authentication.md
      endpoints.md
  guides/
    beginners-guide.md
    advanced-topics.md
  changelog.md
```

### Collection Organization

Group related content:

```typescript
const collections = {
  docs: defineCollection({ /* schema */ }),
  guides: defineCollection({ /* schema */ }),
  blog: defineCollection({ /* schema */ }),
};
```

## Querying Content

### Basic Queries

```typescript
import { getCollection } from 'astro:content';

// Get all docs
const allDocs = await getCollection('docs');

// Filter drafts
const publishedDocs = await getCollection('docs', ({ data }) => {
  return !data.draft;
});

// Sort by date
const sortedDocs = allDocs.sort((a, b) =>
  b.data.date.getTime() - a.data.date.getTime()
);
```

### Advanced Queries

```typescript
// Get by tag
const tutorialDocs = await getCollection('docs', ({ data }) => {
  return data.tags?.includes('tutorial');
});

// Get by category and sort
const apiDocs = await getCollection('docs', ({ data }) => {
  return data.category === 'api';
}).then(docs => docs.sort((a, b) => a.data.order - b.data.order));
```

## Table of Contents (TOC)

### Generating TOC

Extract headings from markdown:

```typescript
function generateTOC(markdown: string) {
  const headings = markdown.match(/^#{2,3} .+$/gm);
  return headings?.map(heading => {
    const level = heading.match(/^#+/)?.[0].length;
    const text = heading.replace(/^#+\s/, '');
    const slug = text.toLowerCase().replace(/\s+/g, '-');
    return { level, text, slug };
  });
}
```

### Displaying TOC

```jsx
<nav className="toc">
  <h2>On this page</h2>
  <ul>
    {toc.map(item => (
      <li className={`toc-${item.level}`}>
        <a href={`#${item.slug}`}>{item.text}</a>
      </li>
    ))}
  </ul>
</nav>
```

## Reading Time

Calculate estimated reading time:

```typescript
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
```

## Best Practices

### Content Authoring

1. **Clear frontmatter:** Required fields documented
2. **Consistent structure:** Similar content uses similar patterns
3. **Meaningful slugs:** Readable URLs
4. **Good headings:** Clear hierarchy, descriptive
5. **Alt text:** All images have alt text

### Technical

1. **Type-safe schemas:** Validate frontmatter
2. **Proper escaping:** Handle special characters
3. **Error handling:** Graceful failures for malformed content
4. **Build-time validation:** Catch errors during build
5. **Fast processing:** Optimize for build speed

### Accessibility

1. **Semantic HTML:** Proper heading hierarchy
2. **Alt text:** Descriptive image alternatives
3. **Link text:** Descriptive link text (not "click here")
4. **Code blocks:** Announce to screen readers
5. **Contrast:** Ensure syntax highlighting has good contrast

## Common Patterns

### Related Content

```typescript
function getRelatedContent(current: ContentItem, all: ContentItem[]) {
  return all
    .filter(item => item.id !== current.id)
    .filter(item => {
      // Share at least one tag
      return item.data.tags?.some(tag =>
        current.data.tags?.includes(tag)
      );
    })
    .slice(0, 3);
}
```

### Breadcrumbs

```typescript
function generateBreadcrumbs(slug: string) {
  const parts = slug.split('/');
  return parts.map((part, i) => ({
    label: part,
    href: '/' + parts.slice(0, i + 1).join('/'),
  }));
}
```

## Troubleshooting

**MDX not rendering:**
- Check plugin configuration
- Verify imports are correct
- Look for syntax errors in MDX

**Frontmatter not parsing:**
- Ensure triple dashes `---` around YAML
- Check YAML syntax (indentation matters)
- Validate against schema

**Syntax highlighting not working:**
- Verify plugin is installed and configured
- Check language identifier is correct
- Ensure theme is loaded

---

*This skill provides comprehensive knowledge for working with MDX and content processing. Reference it when implementing content features.*

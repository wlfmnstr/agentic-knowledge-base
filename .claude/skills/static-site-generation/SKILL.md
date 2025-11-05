---
name: static-site-generation
description: Patterns and best practices for static site generation, file-based routing, and build optimization
---

# Static Site Generation Skill

Expert knowledge for building static sites with modern frameworks.

## Core Concepts

### What is Static Site Generation (SSG)?

Static site generation builds HTML pages at build time rather than runtime. Benefits:

- **Performance:** Pre-rendered HTML loads instantly
- **Security:** No server-side code execution, reduced attack surface
- **Scalability:** Static files are easy to cache and serve via CDN
- **Reliability:** No database or backend dependencies
- **Cost:** Cheap to host (GitHub Pages, Netlify, Vercel, etc.)

### When to Use SSG

Perfect for:
- Documentation sites
- Blogs and content sites
- Marketing sites
- Knowledge bases (like this project!)
- Any content-driven site with infrequent updates

Not ideal for:
- Highly dynamic data
- Personalized content that varies per user
- Real-time applications
- Frequently updated data (unless using ISR or similar)

## Popular SSG Frameworks

### Astro
- **Best for:** Content-focused sites, MDX support, multi-framework
- **Pros:** Fast, flexible, brings-your-own-framework, excellent MDX
- **Cons:** Newer ecosystem, fewer plugins than Next.js
- **TypeScript:** Excellent support
- **GitHub Pages:** Good support

### Next.js (with static export)
- **Best for:** React apps, large ecosystems, SSG + SSR hybrid
- **Pros:** Huge ecosystem, excellent docs, powerful features
- **Cons:** Overkill for simple sites, larger bundle size
- **TypeScript:** Excellent support
- **GitHub Pages:** Works but needs configuration

### VitePress
- **Best for:** Documentation, Vue-based, fast
- **Pros:** Extremely fast, great for docs, simple
- **Cons:** Less flexible than Astro/Next, Vue-specific
- **TypeScript:** Good support
- **GitHub Pages:** Excellent support

### Gatsby
- **Best for:** Complex data sourcing, GraphQL fans
- **Pros:** Powerful data layer, large plugin ecosystem
- **Cons:** Complex, slower builds, heavier learning curve
- **TypeScript:** Good support
- **GitHub Pages:** Good support

## File-Based Routing

Most SSG frameworks use file-based routing where directory structure maps to URLs:

```
src/pages/
  index.astro          → /
  about.astro          → /about
  docs/
    index.astro        → /docs
    getting-started.md → /docs/getting-started
    api/
      auth.md          → /docs/api/auth
```

### Routing Patterns

**Index files:** `index.{ext}` maps to directory root
**Dynamic routes:** `[slug].astro` matches any value
**Rest parameters:** `[...path].astro` catches all paths
**Optional parameters:** `[[optional]].astro` optionally matches

## Content Collections

Modern frameworks provide content collection APIs:

```typescript
// Define a collection schema
import { z, defineCollection } from 'astro:content';

const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'docs': docsCollection,
};
```

Benefits:
- Type-safe content access
- Frontmatter validation
- Easy querying and filtering
- Great DX with autocomplete

## Build Optimization

### Strategies

1. **Incremental builds:** Only rebuild changed pages
2. **Parallel processing:** Build pages in parallel
3. **Asset optimization:** Image optimization, minification
4. **Code splitting:** Split JavaScript bundles by route
5. **Caching:** Cache dependencies and build artifacts

### Performance Targets

- **Build time:** Under 2 minutes for typical sites
- **Page size:** Under 100KB initial HTML+CSS+JS
- **Time to Interactive:** Under 2 seconds on 3G
- **Lighthouse score:** 90+ across all metrics

## MDX Integration

MDX combines Markdown with JSX/components:

```mdx
---
title: My Document
---

# {frontmatter.title}

This is regular markdown content.

<CustomComponent prop="value" />

You can use components inline!
```

### MDX Configuration

Common plugins:
- **remark-gfm:** GitHub-flavored markdown
- **remark-toc:** Table of contents generation
- **rehype-pretty-code:** Syntax highlighting
- **rehype-slug:** Heading IDs
- **rehype-autolink-headings:** Clickable heading links

## Static Site Deployment

### GitHub Pages

Requirements:
- Static HTML output in a directory
- Correct base path configuration
- CNAME file for custom domains (optional)

Configuration:
```javascript
// Set base path for subpath deployment
base: '/repo-name/'
```

### Deployment Workflow

1. **Build:** Generate static files
2. **Test:** Verify build output
3. **Deploy:** Upload to hosting
4. **Validate:** Check deployment works

## Common Patterns

### Layout System

Use layout components for consistent structure:

```typescript
---
// Layout.astro
const { title, description } = Astro.props;
---
<html>
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <header>...</header>
    <main>
      <slot />
    </main>
    <footer>...</footer>
  </body>
</html>
```

### Navigation Generation

Generate nav from content structure:

```typescript
import { getCollection } from 'astro:content';

const docs = await getCollection('docs');
const nav = docs.map(doc => ({
  title: doc.data.title,
  slug: doc.slug,
}));
```

### Search Implementation

Options for static site search:
- **Client-side:** Lunr.js, Fuse.js, Pagefind
- **API-based:** Algolia, Meilisearch
- **Build-time indexing:** Generate search index during build

## Best Practices

1. **Content-first:** Design for content creators
2. **Performance:** Optimize for speed
3. **Accessibility:** Semantic HTML, ARIA where needed
4. **SEO-friendly:** Even internal tools benefit from good structure
5. **Type-safe:** Use TypeScript for everything
6. **DX-focused:** Great developer experience leads to better outcomes

## Debugging Tips

- Use framework dev tools
- Check build output directory structure
- Verify paths are correct (absolute vs. relative)
- Test locally with production build
- Check browser console for errors
- Validate generated HTML

## Resources

- Framework docs (always check official docs first)
- MDX documentation
- GitHub Pages documentation
- Web.dev for performance guidance
- WCAG for accessibility standards

---

*This skill provides foundational knowledge for static site generation. Reference it when making framework decisions or implementing SSG patterns.*

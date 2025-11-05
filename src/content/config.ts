import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date().optional(),
    draft: z.boolean().default(false),
    order: z.number().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    sidebar: z.boolean().default(true),
  }),
});

// Landing zone for raw, unprocessed brain dumps
const brainDumpsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    source: z.enum(['audio', 'text', 'transcript', 'conversation']),
    duration: z.string().optional(),
    tags: z.array(z.string()).optional(),
    processed: z.boolean().default(false),
    stagedItems: z.array(z.string()).optional(),
  }),
});

// Staging area for processed but not yet integrated content
const stagingCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    sourceFile: z.string(), // Reference to brain dump
    extractedDate: z.date(),
    targetCategory: z.string().optional(),
    status: z.enum(['new', 'reviewed', 'ready', 'integrated']).default('new'),
    tags: z.array(z.string()),
    relatedTopics: z.array(z.string()).optional(),
    integrationNotes: z.string().optional(),
  }),
});

export const collections = {
  docs: docsCollection,
  'brain-dumps': brainDumpsCollection,
  staging: stagingCollection,
};

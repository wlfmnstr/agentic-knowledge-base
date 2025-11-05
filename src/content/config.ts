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

export const collections = {
  docs: docsCollection,
};

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['robotics', 'simulation', 'apps']),
    status: z.enum(['working', 'experimental', 'in progress']),
    year: z.number(),
    stack: z.array(z.string()),
    repo: z.string().default(''),
    repoPrivate: z.boolean().default(false),
    live: z.string().default(''),
    play: z.string().default(''),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

export const collections = { projects };

// 1. Import utilities from `astro:content`
import { defineCollection, reference, z } from 'astro:content';
// 2. Define your collection(s)
const submissionCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		hook: z.string(),
		image: z.string(),
		tags: z.array(z.string()),
		date: z.date(),
		draft: z.boolean(),
		pinned: z.boolean(),
		author: reference('authors'),
	}),
});
const authorCollection = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
	}),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'submissions': submissionCollection,
	'authors': authorCollection
};
import { z } from 'zod';

export const addRaagSchema = z.object({
	name: z.string().min(3),
	S: z.boolean().default(false),
	r: z.boolean().default(false),
	R: z.boolean().default(false),
	g: z.boolean().default(false),
	G: z.boolean().default(false),
	M: z.boolean().default(false),
	m: z.boolean().default(false),
	P: z.boolean().default(false),
	d: z.boolean().default(false),
	D: z.boolean().default(false),
	n: z.boolean().default(false),
	N: z.boolean().default(false),
	s: z.boolean().default(false)
});

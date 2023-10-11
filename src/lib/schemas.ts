import { z } from 'zod';

export const addRaagSchema = z.object({
	name: z.string(),
	S: z.string().length(1),
	r: z.string().length(1),
	R: z.string().length(1),
	g: z.string().length(1),
	G: z.string().length(1),
	M: z.string().length(1),
	m: z.string().length(1),
	P: z.string().length(1),
	d: z.string().length(1),
	D: z.string().length(1),
	n: z.string().length(1),
	N: z.string().length(1),
	s: z.string().length(1)
});

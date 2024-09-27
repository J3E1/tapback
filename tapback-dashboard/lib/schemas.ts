import { z } from 'zod';

export const registerSchema = z.object({
	name: z
		.string({ required_error: 'Please enter a name' })
		.min(2, { message: 'Please enter a name' })
		.max(50, { message: 'Name is too long' }),
	email: z
		.string({ required_error: 'Please enter an email' })
		.email({ message: 'Please enter a valid email' }),
	password: z
		.string({ required_error: 'Please enter a password' })
		.min(4, { message: 'Please enter a valid password' })
		.max(20, { message: 'Password is too long' }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
	email: z
		.string({ required_error: 'Please enter an email' })
		.email({ message: 'Please enter a valid email' })
		.max(50),
	password: z
		.string({ required_error: 'Please enter a password' })
		.min(4, { message: 'Please enter a valid password' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const projectSchema = z.object({
	name: z.string().min(2, {
		message: 'Project name must be at least 2 characters.',
	}),
	siteUrl: z.string().url({
		message: 'Please enter a valid URL.',
	}),
	description: z.string().optional(),
});

export type ProjectSchema = z.infer<typeof projectSchema>;

export const widgetSchema = z.object({
	projectId: z.string().uuid(),
	backgroundColor: z.string().min(1),
	primaryColor: z.string().min(1),
	typographyColor: z.string().min(1),
	radius: z.string().min(1),
});

export const submitReviewSchema = z.object({
	email: z.string().email(),
	feedback: z.string(),
	rating: z.enum(['BAD', 'DECENT', 'LOVE_IT']),
});

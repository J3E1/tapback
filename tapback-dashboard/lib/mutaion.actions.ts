'use server';
import { validateRequest } from './auth';
import prismaClient from './prisma-client';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { projectSchema } from './schemas';

const reviewSchema = z.object({
	projectId: z.string().uuid(),
	email: z.string().email(),
	feedback: z.string().min(1),
	rating: z.enum(['BAD', 'DECENT', 'LOVE_IT']),
});

const widgetSchema = z.object({
	projectId: z.string().uuid(),
	backgroundColor: z.string().min(1),
	primaryColor: z.string().min(1),
	typographyColor: z.string().min(1),
	radius: z.string().min(1),
});

export async function createProject(data: z.infer<typeof projectSchema>) {
	const result = projectSchema.safeParse(data);
	if (!result.success) {
		return { success: false, error: result.error.message };
	}

	try {
		const { user } = await validateRequest();
		if (!user) return { success: false, error: 'Unauthorized' };

		await prismaClient.project.create({
			data: { ...result.data, userId: user.id },
		});
		revalidatePath('/app/projects');
		return { success: true, message: 'Project created' };
	} catch (error) {
		console.error('Error creating project:', error);
		return { success: false, error: 'Could not create project' };
	}
}

const editProjectSchema = projectSchema.extend({ projectId: z.string() });
export async function editProject(data: z.infer<typeof editProjectSchema>) {
	const result = editProjectSchema.safeParse(data);
	if (!result.success) {
		return { success: false, error: result.error.message };
	}

	try {
		const { user } = await validateRequest();
		if (!user) return { success: false, error: 'Unauthorized' };

		const project = await prismaClient.project.update({
			data: {
				name: result.data.name,
				siteUrl: result.data.siteUrl,
				description: result.data.description,
			},
			where: { id: result.data.projectId, userId: user.id },
		});
		revalidatePath(`app/projects/${project.id}/edit`);
		return { success: true, message: 'Project edited' };
	} catch (error) {
		console.error('Error creating project:', error);
		return { success: false, error: 'Could not create project' };
	}
}

export async function deleteProject(projectId: string, revalidate = true) {
	const { user } = await validateRequest();
	if (!user) return { success: false, error: 'Unauthorized' };

	try {
		await prismaClient.project.delete({
			where: { id: projectId, userId: user.id },
		});

		revalidate &&revalidatePath('/app/projects');
		return { success: true, message: 'Project deleted' };
	} catch (error) {
		console.error('Error creating project:', error);
		return { success: false, error: 'Could not create project' };
	}
}

export async function addReview(data: z.infer<typeof reviewSchema>) {
	const result = reviewSchema.safeParse(data);
	if (!result.success) {
		return { success: false, error: result.error.message };
	}

	try {
		const review = await prismaClient.review.create({
			data: result.data,
		});

		return { success: true, review };
	} catch (error) {
		console.error('Error adding review:', error);
		return { success: false, error: 'Could not add review' };
	}
}

export async function editWidget(data: z.infer<typeof widgetSchema>) {
	const result = widgetSchema.safeParse(data);
	if (!result.success) {
		return { success: false, message: result.error.message };
	}

	try {
		const widget = await prismaClient.widget.update({
			where: { projectId: result.data.projectId },
			data: result.data,
		});

		return { success: true, widget };
	} catch (error) {
		console.error('Error editing widget:', error);
		return { success: false, message: 'Could not edit widget' };
	}
}

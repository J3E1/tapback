'use server';
import { validateRequest } from './auth';
import prismaClient from './prisma-client';

import { IWidget } from '@/typings/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { projectSchema, widgetSchema } from './schemas';

export async function createProject(data: z.infer<typeof projectSchema>) {
	const result = projectSchema.safeParse(data);
	if (!result.success) {
		return { success: false, error: result.error.message };
	}

	try {
		const { user } = await validateRequest();
		if (!user) return { success: false, error: 'Unauthorized' };

		const project = await prismaClient.project.create({
			data: { ...result.data, userId: user.id },
		});
		await prismaClient.widget.create({
			data: {
				projectId: project.id,
			},
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

		revalidate && revalidatePath('/app/projects');
		return { success: true, message: 'Project deleted' };
	} catch (error) {
		console.error('Error creating project:', error);
		return { success: false, error: 'Could not create project' };
	}
}

export async function editWidget(data: z.infer<typeof widgetSchema>) {
	const result = widgetSchema.safeParse(data);
	if (!result.success) {
		return { success: false, error: result.error.message };
	}

	try {
		const foundWidget = await prismaClient.widget.findUnique({
			where: { projectId: result.data.projectId },
		});

		let widget: IWidget;
		if (!foundWidget) {
			widget = await prismaClient.widget.create({
				data: {
					backgroundColor: result.data.backgroundColor,
					primaryColor: result.data.primaryColor,
					typographyColor: result.data.typographyColor,
					radius: result.data.radius,
					projectId: result.data.projectId,
				},
			});
		} else {
			widget = await prismaClient.widget.update({
				where: { projectId: result.data.projectId },
				data: result.data,
			});
		}
		revalidatePath(`app/projects/${widget.projectId}/customize`);
		return { success: true, message: 'Widget saved' };
	} catch (error) {
		console.error('Error editing widget:', error);
		return { success: false, error: 'Could not edit widget' };
	}
}

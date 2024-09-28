import { validateRequest } from './auth';
import prismaClient from './prisma-client';

export async function getAllProjects() {
	try {
		const { user } = await validateRequest();

		if (!user) {
			return { success: false, message: 'Unauthorized' };
		}
		const projects = await prismaClient.project.findMany({
			where: { userId: user.id },
			orderBy: { updatedAt: 'desc' },
		});

		return { success: true, projects, projectLimit: user.pricingPlan?.projectLimit };
	} catch (error) {
		console.error('Error fetching projects:', error);
		return { success: false, message: 'Could not fetch projects' };
	}
}

export async function getProjectById(projectId: string) {
	try {
		const { user } = await validateRequest();

		if (!user) {
			return { success: false, message: 'Unauthorized' };
		}
		const project = await prismaClient.project.findUnique({
			where: { userId: user.id, id: projectId },
		});

		if (!project) return { success: false, message: 'Project not found' };

		return { success: true, project };
	} catch (error) {
		console.error('Error fetching projects:', error);
		return { success: false, message: 'Could not fetch projects' };
	}
}

export async function getAllReviewsByProjectId(projectId: string) {
	try {
		const reviews = await prismaClient.review.findMany({
			where: { projectId },
			orderBy: { submittedAt: 'desc' },
		});

		return { success: true, reviews };
	} catch (error) {
		console.error('Error fetching reviews:', error);
		return { success: false, message: 'Could not fetch reviews' };
	}
}

export async function getWidgetByProjectId(projectId: string) {
	try {
		const widget = await prismaClient.widget.findUnique({
			where: { projectId },
		});

		return { success: true, widget };
	} catch (error) {
		console.error('Error fetching widget:', error);
		return { success: false, message: 'Could not fetch widget' };
	}
}

export async function getPricingPlanByUserId(userId: string) {
	try {
		const pricingPlan = await prismaClient.user.findUnique({
			where: { id: userId },
			select: { pricingPlan: true },
		})
		return { success: true, pricingPlan: pricingPlan?.pricingPlan } as const;
	} catch (error) {
		console.error('Error fetching pricing plan:', error);
		return { success: false, message: 'Could not fetch pricing plan' } as const;
	}
}
import ProjectForm from '@/components/project-form';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { getProjectById } from '@/lib/query.services';
import { notFound } from 'next/navigation';

export default async function EditProjectDetails({
	params,
}: {
	params: { projectId: string };
}) {
	const project = await getProjectById(params.projectId);

	if (!project.success || !project.project) {
		return notFound();
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle>Edit Project</CardTitle>
				<CardDescription>
					Edit the details of your project here. Click save when you&apos;re
					done.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ProjectForm
					edit
					project={{
						description: project.project.description,
						id: project.project.id,
						name: project.project.name,
						siteUrl: project.project.siteUrl,
					}}
				/>
			</CardContent>
		</Card>
	);
}

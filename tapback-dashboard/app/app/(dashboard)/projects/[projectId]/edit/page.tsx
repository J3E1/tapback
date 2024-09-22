import ProjectForm from '@/components/project-form';
import { Card } from '@/components/ui/card';
import { getProjectById } from '@/lib/query.services';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Project Details',
};
export default async function EditProjectDetails({ params }: { params: { projectId: string } }) {
	const project = await getProjectById(params.projectId);

	if (!project.success || !project.project) {
		return notFound();
	}
	return (
		<Card className='p-6'>
			<ProjectForm
				edit
				project={{
					description: project.project.description,
					id: project.project.id,
					name: project.project.name,
					siteUrl: project.project.siteUrl,
				}}
			/>
		</Card>
	);
}

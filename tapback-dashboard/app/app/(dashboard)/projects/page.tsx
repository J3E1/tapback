import ProjectCard, { AddProjectCard } from '@/components/project-card';
import { getAllProjects } from '@/lib/query.services';

export default async function ProjectsPage() {
	const response = await getAllProjects();

	if (!response.success) {
		return (
			<div className='container mx-auto my-4 px-4 lg:px-6 py-2'>
				<p>{response.message}</p>
			</div>
		);
	}

	const projects = response.projects;
	const totalProjects = projects?.length || 0;
	const projectLimit = response.projectLimit || 0;

	return (
		<div className='container mx-auto my-4 px-4 lg:px-6 py-2'>
			<h1 className='text-2xl font-semibold mb-4'>
				Projects
				<span className='font-normal text-sm ml-2 text-muted-foreground'>
					{totalProjects} of {projectLimit}
				</span>
			</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{projects?.map(project => (
					<ProjectCard
						key={project.id}
						project={{
							description: project.description,
							name: project.name,
							siteUrl: project.siteUrl,
							id: project.id,
						}}
					/>
				))}
				<AddProjectCard isProjectLimitReached={totalProjects >= projectLimit} />
			</div>
		</div>
	);
}

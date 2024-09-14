import ProjectCard from '@/components/project-card';

export default function ProjectsPage() {
	return (
		<div className=''>
			<h1 className='text-2xl font-bold mb-4'>Projects</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{[
					{
						id: '1',
						title: 'Project 1',
						description: 'Description for Project 1',
					},
					{
						id: '2',
						title: 'Project 2',
						description: 'Description for Project 2',
					},
					{
						id: '3',
						title: 'Project 3',
						description: 'Description for Project 3',
					},
				].map(project => (
					<ProjectCard key={project.id} project={project} />
				))}
				<ProjectCard />
			</div>
		</div>
	);
}

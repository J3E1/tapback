import Sidebar from '@/components/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getAllProjects } from '@/lib/query.services';

export default async function ProjectLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const response = await getAllProjects();

	if (!response.success) {
		return (
			<div className='container mx-auto my-4 px-4 lg:px-6 py-2'>
				<p>{response.message}</p>
			</div>
		);
	}

	const projects = response.projects;

	return (
		<div className='flex-grow flex'>
			<TooltipProvider delayDuration={0}>
				<Sidebar
					projects={
						projects?.map(project => ({
							id: project.id,
							name: project.name,
							siteUrl: project.siteUrl,
							description: project.description,
						})) || []
					}
				/>
			</TooltipProvider>
			<main className='w-full flex flex-col sm:gap-4 p-4 md:p-6'>{children}</main>
		</div>
	);
}

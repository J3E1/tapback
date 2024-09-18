'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { IProject } from '@/typings/types';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProjectSwitcherProps {
	projects: IProject[];
}

export function ProjectSwitcher({ projects }: ProjectSwitcherProps) {
	const params = useParams() as { projectId: string };
	const pathName = usePathname();

	const router = useRouter();

	const [selectedProject, setSelectedProject] = useState<string>(params.projectId);

	const onChangeProject = (projectId: string) => {
		setSelectedProject(projectId);
		const stage = pathName.split('/').pop();
		console.log("🚀 ~ file: project-switcher.tsx:24 ~ onChangeProject ~ stage:", stage);
		if (stage === params.projectId) router.push(`/app/projects/${projectId}`);
		else router.push(`/app/projects/${projectId}/${stage}`);
	};

	return (
		<Select defaultValue={selectedProject} onValueChange={onChangeProject}>
			<SelectTrigger
				className={cn(
					'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex lg:[&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:size-4 [&_svg]:shrink-0 [&>svg]:hidden'
				)}
				aria-label='Select project'
			>
				<SelectValue placeholder='Select an project'>
					<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
					<span className={cn('ml-2 hidden lg:inline')}>{projects.find(project => project.id === selectedProject)?.name}</span>
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{projects.map(project => (
					<SelectItem key={project.id} value={project.id}>
						<div className='flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground'>{project.name}</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

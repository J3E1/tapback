'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface ProjectSwitcherProps {
	projects: {
		label: string;
		email: string;
		icon: React.ReactNode;
	}[];
}

export function ProjectSwitcher({ projects }: ProjectSwitcherProps) {
	const [selectedProject, setSelectedProject] = React.useState<string>(
		projects[0].email
	);

	return (
		<Select defaultValue={selectedProject} onValueChange={setSelectedProject}>
			<SelectTrigger
				className={cn(
					'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex lg:[&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&>svg]:hidden lg:[&>svg]:inline'
				)}
				aria-label='Select project'>
				<SelectValue placeholder='Select an project'>
					{projects.find(project => project.email === selectedProject)?.icon}
					<span className={cn('ml-2 hidden lg:inline')}>
						{projects.find(project => project.email === selectedProject)?.label}
					</span>
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{projects.map(project => (
					<SelectItem key={project.email} value={project.email}>
						<div className='flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground'>
							{project.icon}
							{project.email}
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

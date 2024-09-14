'use client';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, Trash2 } from 'lucide-react';

interface Project {
	id: string;
	title: string;
	description: string;
}

interface ProjectCardProps {
	project?: Project;
	// onDelete: () => void;
}

export default function ProjectCard({ project }: ProjectCardProps) {
	if (!project)
		return (
			<Card className='relative cursor-pointer hover:bg-accent-foreground hover:text-background transition-all duration-300 ease-in-out'>
				<Button
					variant='link'
					size='icon'
					className=''
					// onClick={onDelete}
				>
					<PlusIcon className='h-4 w-4' />
					<span className='sr-only'>Add project</span>
				</Button>
			</Card>
		);

	return (
		<Card className='relative cursor-pointer hover:bg-accent-foreground hover:text-background transition-all duration-300 ease-in-out'>
			<CardHeader>
				<CardTitle className='mb-2'>{project.title}</CardTitle>
				<CardDescription>{project.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<Button
					variant='ghost'
					size='icon'
					className='absolute top-2 right-2 hover:bg-destructive hover:text-destructive-foreground'
					// onClick={onDelete}
				>
					<Trash2 className='h-4 w-4' />
					<span className='sr-only'>Delete project</span>
				</Button>
			</CardContent>
		</Card>
	);
}

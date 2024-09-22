'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { deleteProject } from '@/lib/mutaion.actions';
import { IProject } from '@/typings/types';
import { Link2Icon, PlusIcon, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import AddProjectDialog from './add-project-dialog';
import DeleteProjectDialog from './delete-project-dialog';

interface ProjectCardProps {
	project: IProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
	const [deleing, setDeleing] = useState(false);
	const [open, setOpen] = useState(false);

	const deleteHandler = async () => {
		setDeleing(true);
		const response = await deleteProject(project.id);

		if (response.success) {
			toast({
				title: response.message,
			});
			setOpen(false);
		} else {
			toast({
				title: response.error,
				variant: 'destructive',
			});
		}
		setDeleing(false);
	};

	const handleGoToSite = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault(); // Prevent the card click from triggering
		window.open(project.siteUrl, '_blank', 'noopener noreferrer');
	};
	const openDeleteAlert = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault(); // Prevent the card click from triggering
		setOpen(true);
	};

	return (
		<>
			<Link href={'/app/projects/' + project.id}>
				<Card className='relative cursor-pointer hover:bg-primary hover:text-primary-foreground group hover:shadow-lg transition-all duration-300 ease-in-out h-28'>
					<CardHeader className='pb-4'>
						<CardTitle>{project.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription className='truncate group-hover:text-primary-muted-foreground'>
							{project.description}
						</CardDescription>
						<div className='absolute top-2 right-2 space-x-'>
							<Button onClick={handleGoToSite} variant='link' size='sm'>
								<Link2Icon className='size-4 group-hover:text-primary-foreground' />
								<span className='sr-only'>Go to site</span>
							</Button>
							<Button
								disabled={deleing}
								variant='ghost'
								size='sm'
								className='hover:bg-destructive hover:text-destructive-foreground'
								onClick={openDeleteAlert}>
								<Trash2 className='size-4' />
								<span className='sr-only'>Delete project</span>
							</Button>
						</div>
					</CardContent>
				</Card>
			</Link>
			<DeleteProjectDialog
				handleDelete={deleteHandler}
				isDeleting={deleing}
				projectName={project.name}
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
}

export function AddProjectCard({ isProjectLimitReached }: { isProjectLimitReached: boolean }) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Card
				onClick={() => setOpen(true)}
				className='relative cursor-pointer hover:bg-primary hover:text-primary-foreground hover:shadow-lg transition-all duration-300 ease-in-out h-28 flex items-center justify-center group'>
				<Button variant='link' size='icon'>
					<PlusIcon className='size-8 group-hover:text-primary-foreground' />
					<span className='sr-only'>Add project</span>
				</Button>
			</Card>
			<AddProjectDialog
				isProjectLimitReached={isProjectLimitReached}
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
}

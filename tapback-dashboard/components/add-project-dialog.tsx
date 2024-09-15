'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import ProjectForm from './project-form';

export default function AddProjectDialog({
	open,
	setOpen,
	isProjectLimitReached,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	isProjectLimitReached: boolean;
}) {
	if (isProjectLimitReached) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Add New Project</DialogTitle>
						<DialogDescription>
							You have reached the maximum number of projects. Please upgrade
							your plan to add more.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		);
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Add New Project</DialogTitle>
					<DialogDescription>
						Enter the details of your new project here. Click save when
						you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<ProjectForm setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}

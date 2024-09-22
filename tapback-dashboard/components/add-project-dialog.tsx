'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { MotionButton, MotionDiv } from './motion';
import ProjectForm from './project-form';
import { useRouter } from 'next/navigation';

export default function AddProjectDialog({
	open,
	setOpen,
	isProjectLimitReached,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	isProjectLimitReached: boolean;
}) {
	const router = useRouter();

	if (isProjectLimitReached) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<MotionDiv
							className='space-y-1.5'
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
							exit={{ opacity: 0, y: 30, transition: { duration: 0.3, ease: 'easeIn' } }}>
							<DialogTitle>Add New Project</DialogTitle>
							<DialogDescription>
								You have reached the maximum number of projects. Please upgrade your plan to add
								more.
							</DialogDescription>
						</MotionDiv>
					</DialogHeader>
					<DialogFooter>
						<MotionButton
							onClick={() => router.push('/pricing')}
							className='w-full'
							initial={{ opacity: 0, y: 20 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: { duration: 0.4, ease: 'easeOut', delay: 0.4 },
							}}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 1 }}
							exit={{ opacity: 0, y: 30, transition: { duration: 0.3, ease: 'easeIn' } }}>
							Upgrade
						</MotionButton>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='sm:max-w-[425px]'>
				<ProjectForm setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}

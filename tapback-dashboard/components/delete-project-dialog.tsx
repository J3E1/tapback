'use client';

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cardVariants, containerVariants } from '@/lib/constants';
import { Loader2 } from 'lucide-react';
import { MotionAlertDialogCancel, MotionButton, MotionDiv } from './motion';
import { DialogHeader } from './ui/dialog';

interface DeleteProjectDialogProps {
	projectName: string;
	handleDelete: () => Promise<void>;
	open: boolean;
	isDeleting: boolean;
	setOpen: (open: boolean) => void;
}

export default function DeleteProjectDialog({
	projectName,
	handleDelete,
	open,
	setOpen,
	isDeleting,
}: DeleteProjectDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<MotionDiv variants={containerVariants} className='space-y-4'>
					<DialogHeader>
						<MotionDiv variants={cardVariants}>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete the project
								<span className='font-semibold'> {projectName} </span>
								and remove all of its data from our servers.
							</AlertDialogDescription>
						</MotionDiv>
					</DialogHeader>
					<AlertDialogFooter>
						<MotionAlertDialogCancel
							whileHover={{ scale: 1.065 }}
							whileTap={{ scale: 1 }}
							variants={cardVariants}
							disabled={isDeleting}>
							Cancel
						</MotionAlertDialogCancel>
						<MotionButton
							whileHover={{ scale: 1.065 }}
							whileTap={{ scale: 1 }}
							variants={cardVariants}
							variant='destructive'
							onClick={handleDelete}
							disabled={isDeleting}>
							{isDeleting ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Deleting...
								</>
							) : (
								'Delete'
							)}
						</MotionButton>
					</AlertDialogFooter>
				</MotionDiv>
			</AlertDialogContent>
		</AlertDialog>
	);
}

'use client';

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

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
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the
						project
						<span className='font-semibold'> {projectName} </span>
						and remove all of its data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
					<Button
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
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

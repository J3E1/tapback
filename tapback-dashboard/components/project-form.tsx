'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { createProject, deleteProject, editProject } from '@/lib/mutaion.actions';
import { projectSchema, ProjectSchema } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { IProject } from '@/typings/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DeleteProjectDialog from './delete-project-dialog';

export default function ProjectForm({
	setOpen,
	edit = false,
	project,
}: {
	setOpen?: (open: boolean) => void;
	edit?: boolean;
	project?: IProject;
}) {
	const [isDeleting, setIsDeleting] = useState(false);
	const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);

	const router = useRouter()

	const { toast } = useToast();
	const form = useForm<ProjectSchema>({
		resolver: zodResolver(projectSchema),
		defaultValues: {
			name: edit && project?.name ? project.name : '',
			siteUrl: edit && project?.siteUrl ? project.siteUrl : '',
			description: edit && project?.description ? project.description : '',
		},
	});

	const deleteHandler = async () => {
		setIsDeleting(true);
		const response = await deleteProject(project!.id, false);
		if (response.success) {
			toast({
				title: response.message,
			});
			setDeleteDialogIsOpen(false);
			router.push('/app/projects');
		} else {
			toast({
				title: response.error,
				variant: 'destructive',
			});
		}
		setIsDeleting(false);
	};

	async function onSubmit(values: ProjectSchema) {
		const response = await (edit && project
			? editProject({ ...values, projectId: project.id })
			: createProject(values));
		if (response.success) {
			toast({ title: response.message });
			setOpen && setOpen(false);
			!edit && !project && form.reset();
		} else {
			toast({ title: response.error, variant: 'destructive' });
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project Name</FormLabel>
							<FormControl>
								<Input
									disabled={form.formState.isSubmitting}
									placeholder='My Awesome Project'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is the name of your project.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='siteUrl'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Site URL</FormLabel>
							<FormControl>
								<Input
									disabled={form.formState.isSubmitting}
									placeholder='https://myproject.com'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								The URL where your project is hosted.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description (Optional)</FormLabel>
							<FormControl>
								<Textarea
									disabled={form.formState.isSubmitting}
									placeholder='A brief description of your project'
									className='resize-none'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								You can provide a short description of your project here.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={form.formState.isSubmitting}
					type='submit'
					className={cn(!edit && 'w-full')}>
					Save
				</Button>
				{edit && (
					<>
						<Button onClick={() => setDeleteDialogIsOpen(true)} disabled={form.formState.isSubmitting} type='button' variant='destructive' className={'ml-4'}>
							Delete Project
						</Button>
						<DeleteProjectDialog
							isDeleting={isDeleting}
							setOpen={setDeleteDialogIsOpen}
							projectName={project?.name || ''}
							handleDelete={deleteHandler}
							open={deleteDialogIsOpen}
						/>
					</>
				)}
			</form>
		</Form>
	);
}

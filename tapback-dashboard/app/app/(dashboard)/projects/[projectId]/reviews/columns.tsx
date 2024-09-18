'use client';

import { Button } from '@/components/ui/button';
import { IReview } from '@/typings/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

const emojis = {
	BAD: '😞',
	DECENT: '🙂',
	LOVE_IT: '😍',
};

const ratingText = {
	BAD: 'Bad',
	DECENT: 'Decent',
	LOVE_IT: 'Love it!',
};

export const columns: ColumnDef<IReview>[] = [
	{
		accessorKey: 'rating',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Rating
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const rating = row.original.rating;

			const formatted = `${emojis[rating]} ${ratingText[rating]}`;

			return <div className='font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Email
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'feedback',
		header: 'Feedback',
	},
	{
		accessorKey: 'submittedAt',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Submitted At
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const formatted = new Date(row.original.submittedAt).toLocaleString();

			return <div className='font-medium'>{formatted}</div>;
		},
	},
];

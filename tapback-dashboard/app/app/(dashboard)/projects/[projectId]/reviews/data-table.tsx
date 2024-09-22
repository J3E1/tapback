'use client';

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { MotionButton, MotionDiv, MotionInput, MotionTableRow } from '@/components/motion';
import { AnimatePresence } from 'framer-motion';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	});
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 24,
			},
		},
	};

	const tableVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.5,
				ease: [0.43, 0.13, 0.23, 0.96],
			},
		},
	};

	const rowVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: (i: number) => ({
			opacity: 1,
			x: 0,
			transition: {
				delay: i * 0.05,
				type: 'spring',
				stiffness: 100,
				damping: 10,
			},
		}),
		exit: { opacity: 0, x: 20 },
	};
	return (
		<MotionDiv variants={containerVariants} initial='hidden' animate='visible'>
			<MotionDiv className='flex items-center py-4' variants={itemVariants}>
				<MotionInput
					variants={itemVariants}
					placeholder='Filter emails...'
					value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
					onChange={event => table.getColumn('email')?.setFilterValue(event.target.value)}
					className='max-w-sm'
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<MotionButton
							variants={itemVariants}
							variant='outline'
							className='ml-auto'
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							Columns
						</MotionButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter(column => column.getCanHide())
							.map(column => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={value => column.toggleVisibility(!!value)}>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</MotionDiv>
			<MotionDiv variants={tableVariants} className='rounded-md border bg-background'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						<AnimatePresence>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row, i) => (
									<MotionTableRow
										key={row.id}
										variants={rowVariants}
										custom={i}
										initial='hidden'
										animate='visible'
										exit='exit'
										data-state={row.getIsSelected() && 'selected'}>
										{row.getVisibleCells().map(cell => (
											<TableCell key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</MotionTableRow>
								))
							) : (
								<MotionTableRow variants={itemVariants}>
									<TableCell colSpan={columns.length} className='h-24 text-center'>
										No results.
									</TableCell>
								</MotionTableRow>
							)}
						</AnimatePresence>
					</TableBody>
				</Table>
			</MotionDiv>
			<MotionDiv variants={itemVariants} className='flex items-center justify-end space-x-2 py-4'>
				<MotionButton
					variant='outline'
					size='sm'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}>
					Previous
				</MotionButton>
				<MotionButton
					variant='outline'
					size='sm'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}>
					Next
				</MotionButton>
			</MotionDiv>
		</MotionDiv>
	);
}

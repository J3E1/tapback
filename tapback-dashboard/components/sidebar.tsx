import { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { ProjectSwitcher } from './project-switcher';

interface SidebarProps {
	isCollapsed: boolean;
	links: {
		title: string;
		label?: string;
		icon: LucideIcon;
		variant: 'default' | 'ghost';
	}[];
}
export default function Sidebar({ isCollapsed, links }: SidebarProps) {
	return (
		<aside
			data-collapsed={isCollapsed}
			className='lg:w-1/6 group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 border'>
			<nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
				<div className='flex h-[52px] items-center justify-center'>
					<ProjectSwitcher
						projects={[
							{
								label: 'Alicia Koch',
								email: 'alicia@example.com',
								icon: (
									<svg
										role='img'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<title>Vercel</title>
										<path
											d='M24 22.525H0l12-21.05 12 21.05z'
											fill='currentColor'
										/>
									</svg>
								),
							},
							{
								label: 'Alicia Koch',
								email: 'alicia@gmail.com',
								icon: (
									<svg
										role='img'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<title>Gmail</title>
										<path
											d='M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z'
											fill='currentColor'
										/>
									</svg>
								),
							},
						]}
					/>
				</div>
				{links.map((link, index) => (
					<>
						<Tooltip key={index} delayDuration={0}>
							<TooltipTrigger asChild>
								<Link
									href='#'
									className={cn(
										buttonVariants({ variant: link.variant, size: 'icon' }),
										'h-9 w-9 lg:hidden',
										link.variant === 'default' &&
											'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
									)}>
									<link.icon className='size-5' />
									<span className='sr-only'>{link.title}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right' className='flex items-center gap-4'>
								{link.title}
							</TooltipContent>
						</Tooltip>
						<Link
							key={index}
							href='#'
							className={cn(
								buttonVariants({ variant: link.variant, size: 'sm' }),
								link.variant === 'default' &&
									'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
								'justify-start hidden lg:inline-flex'
							)}>
							<link.icon className='mr-2 size-5' />
							{link.title}
						</Link>
					</>
				))}
			</nav>
		</aside>
	);
}

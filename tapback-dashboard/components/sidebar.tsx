'use client';
import { cn } from '@/lib/utils';
import {
	Archive,
	House,
	Link as LinkIcon,
	LucideIcon,
	MessageCircleCode,
	Paintbrush,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { ProjectSwitcher } from './project-switcher';
import { buttonVariants } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface SidebarLink {
	title: string;
	icon: LucideIcon;
	variant: 'default' | 'ghost';
	href: string;
}
const links: SidebarLink[] = [
	{
		title: 'Dashboard',
		icon: House,
		variant: 'default',
		href: '',
	},
	{
		title: 'Reviews',
		icon: MessageCircleCode,
		variant: 'ghost',
		href: 'reviews',
	},
	{
		title: 'Customize',
		icon: Paintbrush,
		variant: 'ghost',
		href: 'customize',
	},
	{
		title: 'Embed',
		icon: LinkIcon,
		variant: 'ghost',
		href: 'embed',
	},
	{
		title: 'Project',
		icon: Archive,
		variant: 'ghost',
		href: 'edit',
	},
];

export default function Sidebar() {
	const pathName = usePathname();
	const { projectId } = useParams() as { projectId: string };

	return (
		<aside className='bg-background lg:w-1/6 group flex flex-col gap-4 py-2'>
			<nav className='grid gap-1 px-2 items-center'>
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
				{links.map((link, index) => {
					link.variant = link.href
						? `/app/projects/${projectId}/${link.href}` === pathName
							? 'default'
							: 'ghost'
						: `/app/projects/${projectId}` === pathName
						? 'default'
						: 'ghost';
					return (
						<Fragment key={index}>
							<Tooltip delayDuration={0}>
								<TooltipTrigger asChild>
									<Link
										href={`/app/projects/${projectId}/${link.href}`}
										className={cn(
											buttonVariants({ variant: link.variant, size: 'icon' }),
											'size-9 lg:hidden mx-auto'
										)}>
										<link.icon className='size-5' />
										<span className='sr-only'>{link.title}</span>
									</Link>
								</TooltipTrigger>
								<TooltipContent
									side='right'
									className='flex items-center gap-4'>
									{link.title}
								</TooltipContent>
							</Tooltip>
							<Link
								href={`/app/projects/${projectId}/${link.href}`}
								className={cn(
									buttonVariants({ variant: link.variant, size: 'sm' }),
									link.variant === 'default' && '',
									'justify-start hidden lg:inline-flex'
								)}>
								<link.icon className='mr-2 size-5' />
								{link.title}
							</Link>
						</Fragment>
					);
				})}
			</nav>
		</aside>
	);
}

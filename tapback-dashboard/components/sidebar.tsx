'use client';
import { cn } from '@/lib/utils';
import { IProject } from '@/typings/types';
import { Archive, House, Link as LinkIcon, LucideIcon, MessageCircleCode, Paintbrush } from 'lucide-react';
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

export default function Sidebar({ projects }: { projects: IProject[] }) {
	const pathName = usePathname();
	const { projectId } = useParams() as { projectId: string };

	return (
		<aside className='bg-background lg:w-1/6 group flex flex-col gap-4 py-2 border border-t-0'>
			<nav className='grid gap-1 px-2 items-center'>
				<div className='flex h-[52px] items-center justify-center'>
					<ProjectSwitcher projects={projects} />
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

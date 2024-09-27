'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { logout } from '@/lib/auth.actions';
import { cardVariants } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { User } from 'lucia';
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './logo';
import { MotionButton, MotionHeader } from './motion';
import { ModeToggle } from './theme-toggle';
import { Button, buttonVariants } from './ui/button';
import { $Enums } from '@prisma/client';

export function SiteHeader({ user }: Readonly<{ user: { id: string; name: string; email: string; plan:$Enums.Plan} | null }>) {
	const pathname = usePathname();
	const params = useParams() as Record<string, string>;

	const [loggingOut, setLoggingOut] = useState(false);

	async function logoutHandler() {
		setLoggingOut(true);
		await logout();
		setLoggingOut(false);
	}

	const navLinks = (
		<nav className='mr-auto hidden md:flex items-center gap-4 font-medium text-sm lg:gap-6 transition-colors text-foreground/60'>
			<Link className='hover:text-primary/80' href='/'>
				Home
			</Link>
			<Link className='hover:text-primary/80' href='/pricing'>
				Pricing
			</Link>
			<Link className='hover:text-primary/80' href='/contact'>
				Contact Us
			</Link>
			{!!user && (
				<Link className='hover:text-primary/80' href='/app/projects'>
					My Projects
				</Link>
			)}
		</nav>
	);

	const headerVariants = {
		hidden: { y: -100, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
	};

	if (pathname.includes('login') || pathname.includes('register')) return null;

	return (
		<MotionHeader
			variants={headerVariants}
			initial='hidden'
			animate='visible'
			className='sticky top-0 z-50 w-full bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 border-b'>
			<div
				className={cn(
					'h-14 flex items-center px-3 lg:px-5',
					!params.projectId ? 'container mx-auto' : ''
				)}>
				<div className='mr-auto'>
					<Link
						href={user ? '/app/projects': '/'}
						className='mr-4 flex items-center space-x-2 lg:mr-6 text-primary'>
						<Logo className='size-8' />
						<span className='text-primary text-xl font-bold hidden lg:inline'>TapBack</span>
					</Link>
				</div>

				{!!!params.projectId && navLinks}
				<ModeToggle />
				{!!user ? (
					<>
						<Popover>
							<PopoverTrigger asChild>
								<Button variant='ghost' size='icon'>
									<UserRound className='size-5' />
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<div className='flex flex-col items-center pb-4 gap-1'>
									<p>{user.plan.at(0)?.toUpperCase() + user.plan.slice(1).toLocaleLowerCase()} Plan</p>
									<p>{user.name}</p>
									<p>{user.email}</p>
								</div>

								<MotionButton
									whileHover={{ scale: 1.065 }}
									whileTap={{ scale: 1 }}
									variants={cardVariants}
									initial='hidden'
									animate='visible'
									variant='destructive'
									disabled={loggingOut}
									onClick={logoutHandler}
									className='w-full'>
									Log out
								</MotionButton>
							</PopoverContent>
						</Popover>
					</>
				) : (
					<Link href='/app/register' className={cn(buttonVariants({ variant: 'outline' }))}>
						Sign Up
					</Link>
				)}
			</div>
		</MotionHeader>
	);
}

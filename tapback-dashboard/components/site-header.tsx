'use client';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { logout } from '@/lib/auth.actions';
import { User } from 'lucia';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './logo';
import { ModeToggle } from './theme-toggle';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';

export function SiteHeader({ user }: Readonly<{ user: User | null }>) {
	const pathname = usePathname();

	const [loggingOut, setLoggingOut] = useState(false);

	async function logoutHandler() {
		setLoggingOut(true);
		await logout();
		setLoggingOut(false);
	}

	if (pathname.includes('login') || pathname.includes('register')) return null;

	return (
		<header className='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='h-14 flex items-center px-3 lg:px-5'>
				<div className='mr-auto'>
					<Link
						href='/app/projects'
						className='mr-4 flex items-center space-x-2 lg:mr-6'>
						<Logo className='size-8' />
						<span className='font-bold hidden lg:inline'>TapBack</span>
					</Link>
				</div>
				<ModeToggle />
				{!!user && (
					<>
						<Popover>
							<PopoverTrigger>
								<Avatar className='ml-2'>
									<AvatarFallback>{user.name[0]}</AvatarFallback>
								</Avatar>
							</PopoverTrigger>
							<PopoverContent className='border-0'>
								<div className='flex flex-col items-center pb-4 gap-1'>
									<p>{user.name}</p>
									<p>{user.email}</p>
								</div>
								<Button
									variant='destructive'
									disabled={loggingOut}
									onClick={logoutHandler}
									className='w-full'>
									Logout
								</Button>
							</PopoverContent>
						</Popover>
					</>
				)}

				{/* <MainNav />
				<MobileNav /> */}
			</div>
		</header>
	);
}

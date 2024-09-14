'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './logo';

export function SiteHeader() {
	const pathname = usePathname();
	return (
		<header className='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='h-14 flex items-center border px-3 lg:px-5'>
				<div className='mr-4'>
					<Link
						href='/app/projects'
						className='mr-4 flex items-center space-x-2 lg:mr-6'>
						<Logo className='size-8' />
						<span className='font-bold hidden lg:inline'>TapBack</span>
					</Link>
				</div>
				{/* <MainNav />
				<MobileNav /> */}
			</div>
		</header>
	);
}

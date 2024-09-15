import Sidebar from '@/components/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function ProjectLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='flex-grow flex'>
			<TooltipProvider delayDuration={0}>
				<Sidebar />
			</TooltipProvider>
			<main className='w-full flex flex-col sm:gap-4 p-2 md:p-3'>
				{children}
			</main>
		</div>
	);
}

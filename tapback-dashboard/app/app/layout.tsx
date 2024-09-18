import { Toaster } from '@/components/ui/toaster';

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='bg-background flex flex-grow'>
			{children}
			<Toaster />
		</div>
	);
}

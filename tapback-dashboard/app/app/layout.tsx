export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='bg-background flex flex-grow'>
			{children}
		</div>
	);
}

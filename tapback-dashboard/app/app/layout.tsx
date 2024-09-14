export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='bg-muted/60 px-4 lg:px-6 py-2 flex-grow'>{children}</div>
	);
}

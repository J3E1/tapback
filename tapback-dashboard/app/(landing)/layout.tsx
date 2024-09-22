export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className='container mx-auto'>{children}</div>;
}

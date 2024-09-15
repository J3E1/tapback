import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user } = await validateRequest();
	if (user) return redirect('/app/projects');
	return (
		<div className='flex flex-grow justify-center items-center'>{children}</div>
	);
}

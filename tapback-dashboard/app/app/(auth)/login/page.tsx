import { Metadata } from 'next';
import LogInForm from '@/components/login-form';

export const metadata: Metadata = {
	title: 'Login to TapBack',
};

export default function LoginFormPage() {
	return <LogInForm />;
}

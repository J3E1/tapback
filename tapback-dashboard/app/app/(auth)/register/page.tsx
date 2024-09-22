import { Metadata } from 'next';
import RegisterForm from '@/components/register-form';

export const metadata: Metadata = {
	title: 'Register to TapBack',
};

export default function RegisterFormPage() {
	return <RegisterForm />;
}

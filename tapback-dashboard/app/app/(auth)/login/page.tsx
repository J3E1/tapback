'use client';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { login } from '@/lib/auth.actions';
import { loginSchema, LoginSchema } from '@/lib/schemas';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
	const { toast } = useToast();

	const [showPassword, setShowPassword] = useState(false);

	const loginForm = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	async function onSubmit(values: LoginSchema) {
		const response = await login(values);
		if (response.success) {
			toast({
				title: response.message,
			});
			redirect('/app/projects');
		} else {
			toast({
				title: response.error,
				variant: 'destructive',
			});
		}
	}
	return (
		<Card className='mx-auto h-fit min-w-[22rem]'>
			<CardHeader>
				<CardTitle className='text-2xl'>Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...loginForm}>
					<form
						onSubmit={loginForm.handleSubmit(onSubmit)}
						className='space-y-3'>
						<FormField
							control={loginForm.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											disabled={loginForm.formState.isSubmitting}
											placeholder='john@doe.com'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={loginForm.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												disabled={loginForm.formState.isSubmitting}
												id='password'
												placeholder='Enter your password'
												type={showPassword ? 'text' : 'password'}
												{...field}
											/>

											{showPassword ? (
												<EyeOff
													className='size-5 absolute right-4 top-2.5 text-muted-foreground hover:text-foreground focus:text-foreground cursor-pointer transition-colors'
													onClick={() => setShowPassword(false)}
												/>
											) : (
												<Eye
													className='size-5 absolute right-4 top-2.5 text-muted-foreground hover:text-foreground focus:text-foreground cursor-pointer transition-colors'
													onClick={() => setShowPassword(true)}
												/>
											)}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type='submit'
							className='w-full'
							disabled={loginForm.formState.isSubmitting}>
							Login
						</Button>
						{/* <OAuthButton /> */}
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link href='/app/register' className='underline cursor-pointer'>
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}

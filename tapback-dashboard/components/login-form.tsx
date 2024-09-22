'use client';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LogInForm() {
	const { toast } = useToast();

	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();

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
			router.replace('/app/projects');
		} else {
			toast({
				title: response.error,
				variant: 'destructive',
			});
		}
	}
	const containerVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 30,
				staggerChildren: 0.07,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: 'spring', stiffness: 300, damping: 30 },
		},
	};
	return (
		<motion.div initial='hidden' animate='visible' variants={containerVariants}>
			<Card className='mx-auto h-fit min-w-[22rem] shadow-lg'>
				<CardHeader>
					<motion.div variants={itemVariants}>
						<CardTitle className='text-2xl'>Login</CardTitle>
					</motion.div>
					<motion.div variants={itemVariants}>
						<CardDescription>Enter your email below to login to your account</CardDescription>
					</motion.div>
				</CardHeader>
				<CardContent>
					<Form {...loginForm}>
						<form onSubmit={loginForm.handleSubmit(onSubmit)} className='space-y-3'>
							<motion.div variants={itemVariants}>
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
							</motion.div>
							<motion.div variants={itemVariants}>
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
													<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
													</motion.div>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</motion.div>
							<motion.div variants={itemVariants}>
								<Button
									type='submit'
									className='w-full'
									disabled={loginForm.formState.isSubmitting}>
									Login
								</Button>
							</motion.div>
						</form>
					</Form>
					<motion.div variants={itemVariants} className='mt-4 text-center text-sm'>
						Don&apos;t have an account?{' '}
						<Link href='/app/register' className='underline cursor-pointer'>
							Sign up
						</Link>
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
}

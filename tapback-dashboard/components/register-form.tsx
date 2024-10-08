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
import { register } from '@/lib/auth.actions';
import { registerSchema, RegisterSchema } from '@/lib/schemas';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RegisterForm() {
	const { toast } = useToast();

	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();

	const registerForm = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
	});
	async function onSubmit(values: RegisterSchema) {
		const response = await register(values);
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
						<CardTitle className='text-2xl'>Register</CardTitle>
					</motion.div>
					<motion.div variants={itemVariants}>
						<CardDescription>Enter your details to create your account</CardDescription>
					</motion.div>
				</CardHeader>
				<CardContent>
					<Form {...registerForm}>
						<form onSubmit={registerForm.handleSubmit(onSubmit)} className='space-y-3'>
							<motion.div variants={itemVariants}>
								<FormField
									control={registerForm.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													disabled={registerForm.formState.isSubmitting}
													placeholder='John Doe'
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
									control={registerForm.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													disabled={registerForm.formState.isSubmitting}
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
									control={registerForm.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<div className='relative'>
													<Input
														disabled={registerForm.formState.isSubmitting}
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
							</motion.div>
							<motion.div variants={itemVariants}>
								<Button
									type='submit'
									className='w-full'
									disabled={registerForm.formState.isSubmitting}>
									Register
								</Button>
							</motion.div>
							{/* <OAuthButton /> */}
						</form>
					</Form>
					<motion.div variants={itemVariants} className='mt-4 text-center text-sm'>
						Already have an account?{' '}
						<Link href='/app/login' className='underline cursor-pointer'>
							Sign in
						</Link>
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
}

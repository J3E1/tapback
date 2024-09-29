'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MotionDiv } from './motion';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
	company: z.string().optional(),
	message: z.string().min(1, { message: 'Message is required' }),
});

export default function ContactFrom() {
	const contactForm = useForm<z.infer<typeof contactSchema>>({
		resolver: zodResolver(contactSchema),
	});
	const { toast } = useToast();
	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 24,
			},
		},
	};
	const onSubmit = async (data: z.infer<typeof contactSchema>) => {
		toast({
			title: 'Sending message...',
			description: `We will get back to you at ${data.email} as soon as possible.`,
		});
		contactForm.reset({
			name: '',
			email: '',
			company: '',
			message: '',
		});
	};

	return (
		<Form {...contactForm}>
			<form onSubmit={contactForm.handleSubmit(onSubmit)} className='space-y-3'>
				<MotionDiv variants={itemVariants}>
					<FormField
						control={contactForm.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input disabled={contactForm.formState.isSubmitting} placeholder='Your name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</MotionDiv>
				<MotionDiv variants={itemVariants}>
					<FormField
						control={contactForm.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input disabled={contactForm.formState.isSubmitting} type='email' placeholder='your@email.com' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</MotionDiv>
				<MotionDiv variants={itemVariants}>
					<FormField
						control={contactForm.control}
						name='company'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Company</FormLabel>
								<FormControl>
									<Input disabled={contactForm.formState.isSubmitting} placeholder='Your company name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</MotionDiv>
				<MotionDiv variants={itemVariants}>
					<FormField
						control={contactForm.control}
						name='message'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Message</FormLabel>
								<FormControl>
									<Textarea disabled={contactForm.formState.isSubmitting} placeholder='How can we help you?' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</MotionDiv>

				<MotionDiv variants={itemVariants}>
					<Button type='submit' className='w-full'>
						<Send className='mr-2 h-4 w-4' /> Send Message
					</Button>
				</MotionDiv>
			</form>
		</Form>
	);
}

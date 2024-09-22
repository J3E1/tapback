import { MotionDiv, MotionP } from '@/components/motion';

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';

import { Metadata } from 'next';
import ContactFrom from '@/components/contact-form';

export const metaData: Metadata = {
	title: 'Contact Sales',
};

export default function ContactPage() {
	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 24,
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

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

	return (
		<section className='py-16 px-4 bg-background'>
			<MotionDiv
				className='max-w-2xl mx-auto'
				variants={containerVariants}
				initial='hidden'
				animate='visible'>
				<Card>
					<CardHeader>
						<MotionDiv variants={itemVariants}>
							<CardTitle className='text-3xl font-bold text-center'>Contact Sales</CardTitle>
							<CardDescription className='text-center mt-2'>
								Get in touch with our sales team for personalized assistance
							</CardDescription>
						</MotionDiv>
					</CardHeader>
					<CardContent>
						<ContactFrom />
					</CardContent>
					<CardFooter>
						<MotionP
							variants={itemVariants}
							className='text-sm text-center w-full text-muted-foreground'>
							We&nbsp;will get back to you within 24 hours.
						</MotionP>
					</CardFooter>
				</Card>
			</MotionDiv>
		</section>
	);
}

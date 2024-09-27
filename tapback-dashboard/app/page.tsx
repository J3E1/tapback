import Link from 'next/link';
import { ChevronRight, Github, LinkedinIcon } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { accordionData } from '@/lib/constants';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { MotionDiv, MotionLink } from '@/components/motion';
import HeroSectionWidget from '@/components/hero-section-widget';

export default function HomePage() {
	const containerVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				staggerChildren: 0.2,
				duration: 0.8,
			},
		},
	};

	const childVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.6 },
		},
	};

	const fadeIn = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 0.8 } },
	};

	const slideUp = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0, transition: { duration: 1 } },
	};
	return (
		<div className='min-h-screen bg-background text-foreground'>
			<main className='container mx-auto px-4'>
				{/* Hero Section */}
				<MotionDiv
					className='py-20 text-center md:text-left md:flex md:items-center md:justify-between space-x-8'
					initial='hidden'
					animate='visible'
					variants={containerVariants}>
					<MotionDiv className='md:w-1/2' variants={childVariants}>
						<h1 className='text-4xl md:text-5xl font-bold mb-6'>
							Capture Customer's Voice, Amplify Your Success
						</h1>
						<p className='mb-8 text-muted-foreground'>
							Empower your business with instant feedback collection. Create, customize, and embed a
							feedback widget in minutes. Track insights on your personalized dashboard.
						</p>
						<MotionLink
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							href='/app/register'
							className={cn(buttonVariants({ size: 'lg' }), 'group')}>
							Get Started Free
							<ChevronRight className='ml-2 group-hover:translate-x-2 transition-transform duration-300' />
						</MotionLink>
					</MotionDiv>
					<MotionDiv className='md:w-1/2 mt-10 md:mt-0' variants={slideUp}>
						<HeroSectionWidget/>
					</MotionDiv>
				</MotionDiv>

				{/* Steps Section */}
				<MotionDiv
					className='py-20'
					initial='hidden'
					whileInView='visible'
					variants={containerVariants}
					viewport={{ once: true, amount: 0.2 }}>
					<h2 className='text-4xl font-bold mb-12 text-center'>
						TapBack - Simple Steps to Success
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
						{[1, 2, 3, 4].map(step => (
							<MotionDiv
								key={step}
								className='bg-card p-6 rounded-lg text-center'
								variants={childVariants}>
								<div className='text-4xl font-bold mb-2'>{step}</div>
								<p className='text-muted-foreground'>
									{step === 1
										? 'Create or customize your feedback widget in a few clicks.'
										: step === 2
										? 'Embed a lightweight script in your website to start collecting feedback instantly.'
										: step === 3
										? 'View real-time feedback and analytics on your dashboard.'
										: 'Use actionable insights to enhance customer experience.'}
								</p>
							</MotionDiv>
						))}
					</div>
				</MotionDiv>

				{/* Why TapBack Section */}
				<MotionDiv className='py-20 md:flex md:items-center md:justify-between space-x-8'>
					<MotionDiv className='md:w-1/2' variants={slideUp}>
						{/* Placeholder for Tapback dashboard illustration */}
						<div className='bg-card h-80 rounded-lg'></div>
					</MotionDiv>
					<MotionDiv
						className='md:w-1/2 mb-10 md:mb-0'
						initial='hidden'
						whileInView='visible'
						variants={fadeIn}>
						<h2 className='text-4xl font-bold mb-6'>Why TapBack?</h2>
						<p className='text-muted-foreground mb-8'>
							TapBack is a no-code feedback solution built for any website. Whether you're a small
							business or a large enterprise, our tool helps you easily gather valuable customer
							feedback. Gain insights that boost satisfaction and loyalty.
						</p>
						<MotionLink
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							href='/app/register'
							className={cn(buttonVariants({ size: 'lg' }), 'group')}>
							Get Started Free
							<ChevronRight className='ml-2 group-hover:translate-x-2 transition-transform duration-300' />
						</MotionLink>
					</MotionDiv>
				</MotionDiv>

				{/* FAQ Section */}
				<MotionDiv
					className='py-20'
					initial='hidden'
					whileInView='visible'
					variants={containerVariants}>
					<h2 className='text-4xl font-bold mb-12 text-center'>FAQ</h2>
					<Accordion type='single' collapsible>
						{accordionData.map((item, index) => (
							<AccordionItem value={`item-${index}`} key={index}>
								<AccordionTrigger className='text-xl font-semibold'>
									{item.question}
								</AccordionTrigger>
								<AccordionContent className='text-muted-foreground'>{item.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</MotionDiv>

				{/* Call to Action Section */}
				<MotionDiv
					className='py-20 px-6 bg-primary rounded-lg text-background'
					initial='hidden'
					whileInView='visible'
					variants={slideUp}>
					<div className='text-center md:flex md:items-center md:justify-between md:text-left'>
						<div className='md:w-1/2 mb-8 md:mb-0'>
							<h2 className='text-4xl font-bold mb-4'>
								Turn Customer Feedback into Business Growth
							</h2>
							<p className='text-primary-muted-foreground'>
								Easily create, customize, and embed feedback widgets on your site. Gather insights
								that help you improve customer experience and drive success.
							</p>
						</div>
						<MotionLink
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							href='/app/register'
							className={cn(buttonVariants({ size: 'lg' }), 'border-2 border-background mr-20 hover:bg-background hover:text-foreground group')}>
							Get Started Free
							<ChevronRight className='ml-2 group-hover:translate-x-2 transition-transform duration-300' />
						</MotionLink>
					</div>
				</MotionDiv>
			</main>

			{/* Footer */}
			<footer className='bg-card/40 mt-12 py-12'>
				<div className='flex justify-center my-18'>
					<Logo className='size-32 text-primary spinning-logo' />
				</div>
				<div className='mt-8 text-center text-muted-foreground'>
					© 2024 TapBack. All rights reserved.
				</div>
				<div className='flex gap-4 justify-center mt-4'>
					<a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
						<LinkedinIcon className='size-8 text-muted-foreground hover:text-primary transition-colors' />
					</a>
					<a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
						<Github className='size-8 text-muted-foreground hover:text-primary transition-colors' />
					</a>
				</div>
			</footer>
		</div>
	);
}

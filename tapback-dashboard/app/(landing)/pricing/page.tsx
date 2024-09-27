import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { MotionCard, MotionDiv, MotionH2, MotionLi } from '@/components/motion';
import { Metadata } from 'next';
import Link from 'next/link';
import { pricingPlans } from '@/lib/constants';

export const metadata: Metadata = {
	title: 'Pricing',
};

export default function PricingSection() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const cardVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
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
				className='max-w-6xl mx-auto'
				variants={containerVariants}
				initial='hidden'
				animate='visible'>
				<MotionH2 className='text-3xl font-bold text-center mb-12' variants={cardVariants}>
					Choose the Perfect Plan for Your Business
				</MotionH2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{pricingPlans.map((plan, index) =>
						index === 1 ? (
							<MotionCard
								key={plan.name}
								variants={cardVariants}
								whileHover={{ y: -5, transition: { duration: 0.2 } }}
								className='flex flex-col h-full bg-primary hover:shadow-lg'>
								<CardHeader>
									<CardTitle className='text-2xl font-bold text-primary-foreground'>
										{plan.name}
									</CardTitle>
									<CardDescription className='text-primary-muted-foreground'>
										{plan.description}
									</CardDescription>
								</CardHeader>
								<CardContent className='flex-grow text-primary-foreground'>
									<p className='text-4xl font-bold mb-6'>
										{plan.price}
										{plan.price !== 'Custom' && <span className='text-sm font-normal'>/month</span>}
									</p>
									<ul className='space-y-2'>
										{plan.features.map((feature, featureIndex) => (
											<MotionLi
												key={featureIndex}
												className='flex items-center space-x-2'
												initial={{ opacity: 0, x: -10 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.1 + featureIndex * 0.05 }}>
												<Check className='h-5 w-5 flex-shrink-0 text-green-500' />
												<span className='text-sm'>{feature}</span>
											</MotionLi>
										))}
									</ul>
								</CardContent>
								<CardFooter className='mt-auto'>
									<Button className='w-full' variant={'dark'}>
										Get Started
									</Button>
								</CardFooter>
							</MotionCard>
						) : (
							<MotionCard
								key={plan.name}
								variants={cardVariants}
								whileHover={{ y: -5, transition: { duration: 0.2 } }}
								className='flex flex-col h-full hover:shadow-lg'>
								<CardHeader>
									<CardTitle className='text-2xl font-bold'>{plan.name}</CardTitle>
									<CardDescription>{plan.description}</CardDescription>
								</CardHeader>
								<CardContent className='flex-grow'>
									<p className='text-4xl font-bold mb-6'>
										{plan.price}
										{plan.price !== 'Custom' && <span className='text-sm font-normal'>/month</span>}
									</p>
									<ul className='space-y-2'>
										{plan.features.map((feature, featureIndex) => (
											<MotionLi
												key={featureIndex}
												className='flex items-center space-x-2'
												initial={{ opacity: 0, x: -10 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.1 + featureIndex * 0.05 }}>
												<Check className='h-5 w-5 flex-shrink-0 text-green-500' />
												<span className='text-sm'>{feature}</span>
											</MotionLi>
										))}
									</ul>
								</CardContent>
								<CardFooter className='mt-auto'>
									{index === 2 ? (
										<Button className='w-full' variant='default' asChild>
											<Link href='/contact'>Contact Sales</Link>
										</Button>
									) : (
										<Button className='w-full' variant={index === 1 ? 'default' : 'outline'}>
											Get Started
										</Button>
									)}
								</CardFooter>
							</MotionCard>
						)
					)}
				</div>
			</MotionDiv>
		</section>
	);
}

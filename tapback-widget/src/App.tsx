import { X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';

type Rating = 'Bad' | 'Decent' | 'Love it!';
interface FormState {
	rating: Rating | null;
	comment: string;
	email: string;
	isEmailValid: boolean;
}

const emojis: Record<Rating, string> = {
	Bad: '😞',
	Decent: '🙂',
	'Love it!': '😍',
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function App() {
	const [formState, setFormState] = useState<FormState>({
		rating: null,
		comment: '',
		email: '',
		isEmailValid: true,
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formIsOpen, setFormIsOpen] = useState(false);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleClickOutside = (event: MouseEvent) => {
		const widget = document.querySelector('#widget-container');
		const btn = document.querySelector('#widget-trigger-btn');
		if (
			widget &&
			!widget.contains(event.target as Node) &&
			btn &&
			!btn.contains(event.target as Node)
		) {
			setFormIsOpen(false);
		}
	};
	const validateEmail = (email: string) => emailRegex.test(email);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateEmail(formState.email)) {
			setFormState(prevState => ({
				...prevState,
				isEmailValid: false,
			}));
			return;
		}
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setIsSubmitted(true);
		}, 4000);
		console.log({
			rating: formState.rating,
			email: formState.email,
			comment: formState.comment,
		});
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState(prevState => ({
			...prevState,
			email: e.target.value,
			isEmailValid: validateEmail(e.target.value),
		}));
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const { name, value } = e.target;
		setFormState(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleRatingChange = (rating: Rating | null) => {
		setFormState(prevState => ({
			...prevState,
			rating,
		}));
	};

	const handleDone = () => {
		setIsSubmitted(false);
		setFormIsOpen(false);
		setFormState({
			rating: null,
			comment: '',
			email: '',
			isEmailValid: true,
		});
	};

	const preSubmitLayout = (
		<motion.div
			key='feedback-form'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}>
			<div className='flex justify-between items-center mb-4'>
				<motion.h2
					className='text-xl font-semibold text-typography'
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2 }}>
					Rate your experience
				</motion.h2>
				<motion.button
					onClick={() => setFormIsOpen(prev => !prev)}
					className='text-typography/30 hover:text-typography/60'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}>
					<X size={20} />
				</motion.button>
			</div>
			<form onSubmit={handleSubmit}>
				<div className='flex justify-between mb-4 gap-4'>
					{(Object.keys(emojis) as Rating[]).map(option => (
						<motion.button
							key={option}
							type='button'
							onClick={() => handleRatingChange(option)}
							className={`w-full flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 box-border ${
								formState.rating === option
									? 'border-primary'
									: 'border-primary/10 hover:border-primary'
							}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							<span>{emojis[option]}</span>
							<span>{option}</span>
						</motion.button>
					))}
				</div>
				<AnimatePresence>
					{formState.rating && (
						<motion.div
							className='space-y-4'
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}>
							<motion.div
								animate={
									formState.isEmailValid ? {} : { x: [-10, 10, -10, 10, 0] }
								}
								transition={{ duration: 0.4 }}>
								<input
									value={formState.email}
									onChange={handleEmailChange}
									placeholder='Your email (required)'
									className={`w-full  px-3 py-2 border bg-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 rounded-lg focus:outline-none ${
										!formState.isEmailValid
											? 'border-destructive'
											: 'border-primary/10'
									}`}
								/>
								{!formState.isEmailValid && (
									<p className='text-destructive text-sm mt-2 mx-3'>
										Please enter a valid email address
									</p>
								)}
							</motion.div>
							<motion.textarea
								value={formState.comment}
								name='comment'
								id='comment'
								onChange={handleInputChange}
								placeholder='Tell us more (optional)'
								className='w-full border-primary/10 px-3 py-2 border bg-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 rounded-lg focus:outline-none'
								rows={3}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.2 }}
							/>
							<MotionButton>Submit your feedback</MotionButton>
						</motion.div>
					)}
				</AnimatePresence>
			</form>
		</motion.div>
	);

	const submittedLayout = (
		<motion.div
			key='thank-you'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, height: 0 }}
			className='text-center h-72 flex flex-col place-content-between'>
			<motion.div
				className='flex justify-center mt-8'
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
				<div className='flex justify-center mb-6 relative'>
					<motion.div
						initial={{ scale: 0, rotate: -45 }}
						animate={{ scale: 1, rotate: -10 }}
						transition={{
							type: 'spring',
							stiffness: 260,
							damping: 20,
							delay: 0.2,
						}}>
						<MessageSquare className='text-typography/15 size-20' />
					</motion.div>
					<motion.div
						initial={{ scale: 0, rotate: 45 }}
						animate={{ scale: 1, rotate: 15 }}
						transition={{
							type: 'spring',
							stiffness: 260,
							damping: 20,
							delay: 0.4,
						}}>
						<MessageSquare className='text-typography/10 size-12 ml-2 -scale-x-100' />
					</motion.div>
				</div>
			</motion.div>
			<motion.h2
				className='text-2xl text-typography font-semibold mb-2'
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2 }}>
				Thank you!
			</motion.h2>
			<motion.p
				className='text-typography/40 mb-6 font-medium'
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.3 }}>
				Your feedback helps us improve, appreciate the time you took to send us
				the feedback!
			</motion.p>
			<MotionButton onClick={handleDone}>Done</MotionButton>
		</motion.div>
	);

	const loadingLayout = (
		<motion.div
			key='loader'
			className='flex items-center justify-center h-72'
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}>
			<div className='flex space-x-2'>
				<motion.div
					className='w-5 h-5 bg-primary rounded-full'
					animate={{ y: [0, -15, 0] }} // Bouncing effect
					transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
				/>
				<motion.div
					className='w-5 h-5 bg-primary rounded-full'
					animate={{ y: [0, -15, 0] }}
					transition={{
						duration: 0.6,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 0.2,
					}} // Bouncing effect with delay
				/>
				<motion.div
					className='w-5 h-5 bg-primary rounded-full'
					animate={{ y: [0, -15, 0] }}
					transition={{
						duration: 0.6,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 0.4,
					}} // Bouncing effect with delay
				/>
			</div>
		</motion.div>
	);

	return (
		<>
			<AnimatePresence mode='popLayout'>
				{formIsOpen && (
					<motion.div
						id='widget-container'
						className='relative' // Make sure the wrapper stays fixed
					>
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
							className='fixed bottom-20 right-5 bg-background/50 rounded-lg shadow-lg p-6 w-[28rem] mx-auto backdrop-blur-2xl supports-[backdrop-filter]:bg-background/55'>
							<AnimatePresence mode='wait'>
								{!isLoading
									? isSubmitted
										? submittedLayout
										: preSubmitLayout
									: loadingLayout}
							</AnimatePresence>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
			{/* Feedback Button */}
			<button
				id='widget-trigger-btn'
				onClick={() => setFormIsOpen(prev => !prev)}
				className='flex gap-2 justify-center items-center fixed bottom-5 right-5 py-3 px-5 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition duration-300'>
				<MessageSquare size={24} /> Feedback
			</button>
		</>
	);
}

const MotionButton = ({
	onClick,
	className,
	children,
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
	<motion.button
		onClick={onClick}
		className={`w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium ${
			className || ''
		}`}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ delay: 0.4 }}
		whileHover={{ scale: 1.03 }}
		whileTap={{ scale: 0.97 }}>
		{children}
	</motion.button>
);

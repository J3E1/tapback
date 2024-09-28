'use client';
import { MessageSquare, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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

export default function Widget({ submitLayout = false }: { submitLayout?: boolean }) {
	const pathName = usePathname();
	const [formState, setFormState] = useState<FormState>({
		rating: null,
		comment: '',
		email: '',
		isEmailValid: true,
	});

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
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState(prevState => ({
			...prevState,
			email: e.target.value,
			isEmailValid: validateEmail(e.target.value),
		}));
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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

	const preSubmitLayout = (
		<div key='feedback-form'>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-semibold text-typography'>Rate your experience</h2>
				<button className='text-typography/30 hover:text-typography/60'>
					<X size={20} />
				</button>
			</div>
			<form onSubmit={handleSubmit}>
				<div className='flex justify-between mb-4 gap-4'>
					{(Object.keys(emojis) as Rating[]).map(option => (
						<button
							key={option}
							type='button'
							onClick={() => handleRatingChange(option)}
							className={`w-full flex flex-col items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 box-border text-typography ${
								formState.rating === option ? 'border-primary' : 'border-primary/10 hover:border-primary'
							}`}
						>
							<span className='px-2 sm:px-4 lg:px-6'>{emojis[option]}</span>
							<span>{option}</span>
						</button>
					))}
				</div>
				<div className='space-y-4'>
					<div>
						<input
							value={formState.email}
							onChange={handleEmailChange}
							placeholder='Your email (required)'
							className={`w-full  px-3 py-2 border bg-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 rounded-lg focus:outline-none text-typography ${
								!formState.isEmailValid ? 'border-destructive' : 'border-primary/10'
							}`}
						/>
						{!formState.isEmailValid && <p className='text-destructive text-sm mt-2 mx-3'>Please enter a valid email address</p>}
					</div>
					<textarea
						value={formState.comment}
						name='comment'
						id='comment'
						onChange={handleInputChange}
						placeholder='Tell us more (optional)'
						className='w-full border-primary/10 px-3 py-2 border bg-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 rounded-lg focus:outline-none text-typography'
						rows={3}
					/>
					{/* Fix for button not working properly on landing page */}
					{pathName !== '/' ? (
						<button
							style={{ transition: 'all 0.2s ease-in-out' }}
							className='w-full bg-primary text-white hover:bg-primary/90 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium'
						>
							Submit your feedback
						</button>
					) : (
						<div
							style={{ transition: 'all 0.2s ease-in-out' }}
							className='w-full text-center bg-primary text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium'
						>
							Submit your feedback
						</div>
					)}
				</div>
			</form>
		</div>
	);

	const submittedLayout = (
		<div className='text-center w-fit h-fit flex flex-col place-content-between'>
			<div className='flex justify-center mt-8'>
				<div className='flex justify-center mb-6 relative'>
					<div>
						<MessageSquare className='text-muted-foreground size-20' />
					</div>
					<div>
						<MessageSquare className='text-muted-foreground size-12 ml-2 -scale-x-100' />
					</div>
				</div>
			</div>
			<h2 className='text-2xl text-muted-foreground font-semibold mb-2'>Thank you!</h2>
			<p className='text-muted-foreground mb-6 font-medium'>Your feedback helps us improve, appreciate the time you took to send us the feedback!</p>
			<div
				style={{ transition: 'all 0.2s ease-in-out' }}
				className='w-full text-center bg-primary text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium'
			>
				Done
			</div>
		</div>
	);

	return <div className='bg-background rounded-lg shadow-lg p-6 max-w-fit md:w-[28rem] mx-auto'>{submitLayout ? submittedLayout : preSubmitLayout}</div>;
}

'use client';
import { X } from 'lucide-react';
import { ButtonHTMLAttributes, useState } from 'react';

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

export default function Widget() {
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

	const preSubmitLayout = (
		<div key='feedback-form'>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-semibold text-typography'>
					Rate your experience
				</h2>
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
							className={`w-full flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 box-border text-typography ${
								formState.rating === option
									? 'border-primary'
									: 'border-primary/10 hover:border-primary'
							}`}>
							<span>{emojis[option]}</span>
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
							className={`w-full  px-3 py-2 border bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 rounded-lg focus:outline-none text-typography ${
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
					</div>
					<textarea
						value={formState.comment}
						name='comment'
						id='comment'
						onChange={handleInputChange}
						placeholder='Tell us more (optional)'
						className='w-full border-primary/10 px-3 py-2 border bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 rounded-lg focus:outline-none text-typography'
						rows={3}
					/>
					<MotionButton>Submit your feedback</MotionButton>
				</div>
			</form>
		</div>
	);

	return (
		<div className='bg-background rounded-lg shadow-lg p-6 w-[28rem] mx-auto'>
			{preSubmitLayout}
		</div>
	);
}

const MotionButton = ({
	onClick,
	className,
	children,
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		onClick={onClick}
		className={`w-full bg-primary text-white hover:bg-primary/90 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium ${
			className || ''
		}`}>
		{children}
	</button>
);

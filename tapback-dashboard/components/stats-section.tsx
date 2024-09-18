import { CalendarDays, MessageSquare, ThumbsUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IReview } from '@/typings/types';

type Props = {
	reviews: IReview[];
};
export default function StatsSection({ reviews }: Props) {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();

	const getMonthData = (month: number, year: number) => {
		return reviews.filter(feedback => {
			const feedbackDate = new Date(feedback.submittedAt);
			return feedbackDate.getMonth() === month && feedbackDate.getFullYear() === year;
		});
	};

	const currentMonthData = getMonthData(currentMonth, currentYear);
	const lastMonthData = getMonthData(currentMonth - 1 < 0 ? 11 : currentMonth - 1, currentMonth - 1 < 0 ? currentYear - 1 : currentYear);

	const calculateChange = (currentValue: number, previousValue: number) => {
		if (previousValue === 0) return currentValue > 0 ? 100 : 0;
		return ((currentValue - previousValue) / previousValue) * 100;
	};

	// Total Feedback
	const currentTotalFeedback = currentMonthData.length;
	const lastTotalFeedback = lastMonthData.length;
	const totalFeedbackChange = calculateChange(currentTotalFeedback, lastTotalFeedback);

	// Average Rating
	const ratingValues = { BAD: 1, DECENT: 2, LOVE_IT: 3 };
	const currentAverageRating = currentMonthData.reduce((sum, feedback) => sum + ratingValues[feedback.rating], 0) / currentTotalFeedback || 0;
	const lastAverageRating = lastMonthData.reduce((sum, feedback) => sum + ratingValues[feedback.rating], 0) / lastTotalFeedback || 0;
	const averageRatingChange = calculateChange(currentAverageRating, lastAverageRating);

	// Positive Feedback Percentage
	const currentPositiveFeedback = currentMonthData.filter(feedback => feedback.rating === 'LOVE_IT').length;
	const lastPositiveFeedback = lastMonthData.filter(feedback => feedback.rating === 'LOVE_IT').length;
	const currentPositivePercentage = (currentPositiveFeedback / currentTotalFeedback) * 100 || 0;
	const lastPositivePercentage = (lastPositiveFeedback / lastTotalFeedback) * 100 || 0;
	const positiveFeedbackChange = calculateChange(currentPositivePercentage, lastPositivePercentage);

	// Most Recent Activity
	const mostRecentFeedback = reviews.length
		? reviews.reduce((latest, feedback) => (new Date(feedback.submittedAt) > new Date(latest.submittedAt) ? feedback : latest))
		: null;

	const formatChange = (change: number) => {
		const sign = change >= 0 ? '+' : '';
		return `${sign}${change.toFixed(1)}%`;
	};

	if (!reviews) return null;

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>Total Feedback</CardTitle>
					<MessageSquare className='size-6 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>{currentTotalFeedback}</div>
					<p className='text-xs text-muted-foreground'>{formatChange(totalFeedbackChange)} from last month</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>Average Rating</CardTitle>
					<ThumbsUp className='size-6 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>{currentAverageRating.toFixed(1)}</div>
					<p className='text-xs text-muted-foreground'>{formatChange(averageRatingChange)} from last month</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>Positive Feedback</CardTitle>
					<Users className='size-6 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>{currentPositivePercentage.toFixed(1)}%</div>
					<p className='text-xs text-muted-foreground'>{formatChange(positiveFeedbackChange)} from last month</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>Recent Activity</CardTitle>
					<CalendarDays className='size-6 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>{mostRecentFeedback ? new Date(mostRecentFeedback.submittedAt).toLocaleDateString() : 'N/A'}</div>
					<p className='text-xs text-muted-foreground'>Last feedback received</p>
				</CardContent>
			</Card>
		</div>
	);
}

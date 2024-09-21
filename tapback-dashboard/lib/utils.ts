import { IReview } from '@/typings/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatChange = (change: number) => {
	const sign = change >= 0 ? '+' : '';
	return `${sign}${change.toFixed(1)}%`;
};
export const calculateStats = (reviews: IReview[], timeRange: 'thisMonth' | 'all') => {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();

	const getMonthData = (month: number, year: number) => {
		return reviews.filter(feedback => {
			const feedbackDate = new Date(feedback.submittedAt);
			return feedbackDate.getMonth() === month && feedbackDate.getFullYear() === year;
		});
	};

	const currentMonthData =
		timeRange === 'thisMonth' ? getMonthData(currentMonth, currentYear) : reviews;
	const lastMonthData =
		timeRange === 'thisMonth'
			? getMonthData(
					currentMonth - 1 < 0 ? 11 : currentMonth - 1,
					currentMonth - 1 < 0 ? currentYear - 1 : currentYear
			  )
			: [];

	const calculateChange = (currentValue: number, previousValue: number) => {
		if (previousValue === 0) return currentValue > 0 ? 100 : 0;
		return ((currentValue - previousValue) / previousValue) * 100;
	};

	// Total Feedback
	const currentTotalFeedback = currentMonthData.length;
	const lastTotalFeedback = lastMonthData.length;
	const totalFeedbackChange =
		timeRange === 'all' ? null : calculateChange(currentTotalFeedback, lastTotalFeedback);

	// Average Rating
	const ratingValues = { BAD: 1, DECENT: 2, LOVE_IT: 3 };
	const currentAverageRating =
		currentMonthData.reduce((sum, feedback) => sum + ratingValues[feedback.rating], 0) /
			currentTotalFeedback || 0;
	const lastAverageRating =
		lastMonthData.reduce((sum, feedback) => sum + ratingValues[feedback.rating], 0) /
			lastTotalFeedback || 0;
	const averageRatingChange =
		timeRange === 'all' ? null : calculateChange(currentAverageRating, lastAverageRating);

	// Positive Feedback Percentage
	const currentPositiveFeedback = currentMonthData.filter(
		feedback => feedback.rating === 'LOVE_IT'
	).length;
	const lastPositiveFeedback = lastMonthData.filter(
		feedback => feedback.rating === 'LOVE_IT'
	).length;
	const currentPositivePercentage = (currentPositiveFeedback / currentTotalFeedback) * 100 || 0;
	const lastPositivePercentage = (lastPositiveFeedback / lastTotalFeedback) * 100 || 0;
	const positiveFeedbackChange =
		timeRange === 'all' ? null : calculateChange(currentPositivePercentage, lastPositivePercentage);

	// Most Recent Activity
	const mostRecentFeedback = reviews.length
		? reviews.reduce((latest, feedback) =>
				new Date(feedback.submittedAt) > new Date(latest.submittedAt) ? feedback : latest
		  )
		: null;

	return {
		totalFeedbackChange,
		currentTotalFeedback,
		currentAverageRating,
		averageRatingChange,
		currentPositivePercentage,
		positiveFeedbackChange,
		mostRecentFeedback,
	};
};

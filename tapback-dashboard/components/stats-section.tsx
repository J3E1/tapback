'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateStats, formatChange } from '@/lib/utils';
import { IReview } from '@/typings/types';
import { CalendarDays, MessageSquare, ThumbsUp, Users } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type Props = {
	reviews: IReview[];
};

export default function StatsSection({ reviews }: Props) {
	const [timeRange, setTimeRange] = useState<'thisMonth' | 'all'>('thisMonth');
	const [stats, setStats] = useState(calculateStats(reviews, timeRange));

	const onTimeRangeChange = (curTimeRange: 'thisMonth' | 'all') => {
		setTimeRange(curTimeRange);
		const newStats = calculateStats(reviews, curTimeRange);
		setStats(newStats);
	};

	const {
		totalFeedbackChange,
		currentTotalFeedback,
		currentAverageRating,
		averageRatingChange,
		currentPositivePercentage,
		positiveFeedbackChange,
		mostRecentFeedback,
	} = stats;

	if (!reviews) return null;

	return (
		<section>
			<div className='flex items-center mb-6'>
				<h3 className='text-3xl font-semibold leading-none tracking-tight'>Feedback Dashboard</h3>
				<Select value={timeRange} onValueChange={onTimeRangeChange}>
					<SelectTrigger
						className='w-[160px] rounded-lg sm:ml-auto'
						aria-label='Select a time range'>
						<SelectValue placeholder='Last 90 days' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All time</SelectItem>
						<SelectItem value='thisMonth'>This Month</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Total Feedback</CardTitle>
						<MessageSquare className='size-6 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{currentTotalFeedback}</div>
						{!!totalFeedbackChange && (
							<p className='text-xs text-muted-foreground'>
								{formatChange(totalFeedbackChange)} from last month
							</p>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Average Rating</CardTitle>
						<ThumbsUp className='size-6 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{currentAverageRating.toFixed(1)}</div>
						{!!averageRatingChange && (
							<p className='text-xs text-muted-foreground'>
								{formatChange(averageRatingChange)} from last month
							</p>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Positive Feedback</CardTitle>
						<Users className='size-6 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{currentPositivePercentage.toFixed(1)}%</div>
						{!!positiveFeedbackChange && (
							<p className='text-xs text-muted-foreground'>
								{formatChange(positiveFeedbackChange)} from last month
							</p>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Recent Activity</CardTitle>
						<CalendarDays className='size-6 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{mostRecentFeedback
								? new Intl.DateTimeFormat('en-US', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
								  }).format(new Date(mostRecentFeedback.submittedAt))
								: 'N/A'}
						</div>
						<p className='text-xs text-muted-foreground'>Last feedback received</p>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

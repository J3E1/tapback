'use client';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from './ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const chartConfig = {
	reviews: {
		label: 'Reviews',
	},
	BAD: {
		label: 'Bad',
		color: 'hsl(var(--chart-1))',
	},
	DECENT: {
		label: 'Decent',
		color: 'hsl(var(--chart-2))',
	},
	LOVE_IT: {
		label: 'Love It',
		color: 'hsl(var(--chart-3))',
	},
} satisfies ChartConfig;

interface IReview {
	id: number;
	projectId: string;
	email: string;
	feedback: string | null;
	rating: 'BAD' | 'DECENT' | 'LOVE_IT';
	submittedAt: Date;
}
function processReviewData(reviews: IReview[], timeRange: string) {
	const now = new Date();
	let startDate: Date | null = null;

	if (timeRange !== 'all') {
		startDate = new Date(now.getTime() - parseInt(timeRange) * 24 * 60 * 60 * 1000);
	}

	const filteredReviews = startDate
		? reviews.filter(review => review.submittedAt >= startDate)
		: reviews;

	const groupedData: {
		[date: string]: { BAD: number; DECENT: number; LOVE_IT: number };
	} = {};

	filteredReviews.forEach(review => {
		const dateStr = review.submittedAt.toISOString().split('T')[0];
		if (!groupedData[dateStr]) {
			groupedData[dateStr] = { BAD: 0, DECENT: 0, LOVE_IT: 0 };
		}
		groupedData[dateStr][review.rating]++;
	});
	return Object.entries(groupedData)
		.sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
		.map(([date, counts]) => ({
			date,
			...counts,
		}));
}
type Props = {
	reviews: IReview[];
};
export default function ChartsSection({ reviews }: Props) {
	// Process data for the chart
	const [timeRange, setTimeRange] = useState('90');
	const [chartData, setChartData] = useState(processReviewData(reviews, timeRange));

	const onTimeRangeChange = (curTimeRange: string) => {
		setTimeRange(curTimeRange);
		const newChartData = processReviewData(reviews, curTimeRange);
		setChartData(newChartData);
	};

	if (!reviews) return null;

	return (
		<Card>
			<CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
				<div className='grid flex-1 gap-1 text-center sm:text-left'>
					<CardTitle>Review Ratings Chart</CardTitle>
					<CardDescription>
						Showing review ratings for the{' '}
						{timeRange === 'all' ? `all time` : `last ${timeRange} days`}
					</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={onTimeRangeChange}>
					<SelectTrigger
						className='w-[160px] rounded-lg sm:ml-auto'
						aria-label='Select a time range'>
						<SelectValue placeholder='Last 90 days' />
					</SelectTrigger>
					<SelectContent className='rounded-xl'>
						<SelectItem value='all' className='rounded-lg'>
							All time
						</SelectItem>
						<SelectItem value='90' className='rounded-lg'>
							Last 90 days
						</SelectItem>
						<SelectItem value='30' className='rounded-lg'>
							Last 30 days
						</SelectItem>
						<SelectItem value='7' className='rounded-lg'>
							Last 7 days
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
				<ChartContainer config={chartConfig} className='aspect-auto h-[250px] w-full'>
					<AreaChart data={chartData}>
						<defs>
							<linearGradient id='fillBAD' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='5%' stopColor='var(--color-BAD)' stopOpacity={0.8} />
								<stop offset='95%' stopColor='var(--color-BAD)' stopOpacity={0.1} />
							</linearGradient>
							<linearGradient id='fillDECENT' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='5%' stopColor='var(--color-DECENT)' stopOpacity={0.8} />
								<stop offset='95%' stopColor='var(--color-DECENT)' stopOpacity={0.1} />
							</linearGradient>
							<linearGradient id='fillLOVE_IT' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='5%' stopColor='var(--color-LOVE_IT)' stopOpacity={0.8} />
								<stop offset='95%' stopColor='var(--color-LOVE_IT)' stopOpacity={0.1} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={value => {
								const date = new Date(value);
								return date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								});
							}}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={value => `${value}`}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									className='bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
									labelFormatter={value => {
										return new Date(value).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
										});
									}}
									indicator='dot'
								/>
							}
						/>
						<Area
							type='monotone'
							dataKey='BAD'
							stackId='1'
							stroke='var(--color-BAD)'
							fill='url(#fillBAD)'
						/>
						<Area
							type='monotone'
							dataKey='DECENT'
							stackId='1'
							stroke='var(--color-DECENT)'
							fill='url(#fillDECENT)'
						/>
						<Area
							type='monotone'
							dataKey='LOVE_IT'
							stackId='1'
							stroke='var(--color-LOVE_IT)'
							fill='url(#fillLOVE_IT)'
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

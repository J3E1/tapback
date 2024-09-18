'use client';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { Bar, BarChart, CartesianGrid, Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { IReview } from '@/typings/types';

const barChartConfig = {
	BAD: {
		label: 'Bad',
		color: '#FCA5A5',
	},
	DECENT: {
		label: 'Decent',
		color: '#FCD34D',
	},
	LOVE_IT: {
		label: 'Love it!',
		color: '#6EE7B7',
	},
} satisfies ChartConfig;

type Props = {
	reviews: IReview[];
};
export default function ChartsSection({ reviews }: Props) {
	// Process data for the chart
	const processChartData = () => {
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const last6Months = Array.from({ length: 6 }, (_, i) => {
			const d = new Date();
			d.setMonth(d.getMonth() - i);
			return { month: monthNames[d.getMonth()], year: d.getFullYear() };
		}).reverse();

		return last6Months.map(({ month, year }) => {
			const monthData = reviews.filter(feedback => {
				const feedbackDate = new Date(feedback.submittedAt);
				return feedbackDate.getMonth() === monthNames.indexOf(month) && feedbackDate.getFullYear() === year;
			});

			return {
				month: `${month} ${year}`,
				BAD: monthData.filter(f => f.rating === 'BAD').length,
				DECENT: monthData.filter(f => f.rating === 'DECENT').length,
				LOVE_IT: monthData.filter(f => f.rating === 'LOVE_IT').length,
			};
		});
	};

	const barChartData = processChartData();

	const processPieChartData = () => {
		const counts = reviews.reduce((acc:Record<string, any>, feedback) => {
			acc[feedback.rating] = (acc[feedback.rating] || 0) + 1;
			return acc;
		}, {});

		return Object.entries(counts).map(([rating, count]) => ({ rating, count }));
	};

	const pieChartData = processPieChartData();

	const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1'];

    if(!reviews) return null

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
			<Card>
				<CardHeader>
					<CardTitle>Ratings Breakdown</CardTitle>
				</CardHeader>
				<CardContent>
					<ChartContainer config={barChartConfig}>
						<ResponsiveContainer width='100%' height={400}>
							<BarChart data={barChartData}>
								<CartesianGrid strokeDasharray='3 3' vertical={false} />
								<XAxis dataKey='month' />
								<YAxis />
								<ChartTooltip content={<ChartTooltipContent className='bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' />} />
								<Legend />
								<Bar dataKey='BAD' name='Bad' stackId='a' fill='#FF6B6B' /> {/* Coral Red */}
								<Bar dataKey='DECENT' name='Decent' stackId='a' fill='#FCD34D' /> {/* Caribbean Green */}
								<Bar dataKey='LOVE_IT' name='Love It' stackId='a' fill='#34D399' /> {/* Blue Grotto */}
							</BarChart>
						</ResponsiveContainer>
					</ChartContainer>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Feedback Distribution</CardTitle>
				</CardHeader>
				<CardContent>
					<ChartContainer config={barChartConfig} className='mx-auto aspect-square max-h-[350px]'>
						<PieChart width={400} height={400}>
							<Pie data={pieChartData} cx='50%' cy='50%' labelLine={false} outerRadius={150} fill='#8884d8' dataKey='count'>
								{pieChartData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<ChartTooltip cursor={false} content={<ChartTooltipContent className='bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' />} />

							<Legend />
							{/* <Label
									content={({ viewBox }) => {
										if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
											return (
												<text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
													<tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
														{'1111111'.toLocaleString()}
													</tspan>
													<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
														Visitors
													</tspan>
												</text>
											);
										}
									}}
								/> */}
						</PieChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</div>
	);
}

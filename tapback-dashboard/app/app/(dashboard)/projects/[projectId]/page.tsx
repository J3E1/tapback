import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, XAxis } from 'recharts';

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import StatsSection from '@/components/stats-section';
import { getAllReviewsByProjectId } from '@/lib/query.services';
import ChartsSection from '@/components/charts-section';


export default async function ProjectDashboardPage({
	params,
}: {
	params: {
		projectId: string;
	};
}) {
	const reviews = await getAllReviewsByProjectId(params.projectId);

	if(!reviews.success) return <div>{reviews.message}</div>;

	if(!reviews.reviews) return <div>No reviews found</div>;

	return (
		<div className='container bg-background'>
			<h3 className='text-3xl font-semibold leading-none tracking-tight mb-6'>Feedback Dashboard</h3>

			<StatsSection reviews={reviews.reviews}/>

			<ChartsSection reviews={reviews.reviews}/>
		</div>
	);
}

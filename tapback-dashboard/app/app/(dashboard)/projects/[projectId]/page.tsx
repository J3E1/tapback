import ChartsSection from '@/components/charts-section';
import StatsSection from '@/components/stats-section';
import { getAllReviewsByProjectId } from '@/lib/query.services';

export default async function ProjectDashboardPage({
	params,
}: {
	params: {
		projectId: string;
	};
}) {
	const reviews = await getAllReviewsByProjectId(params.projectId);

	if (!reviews.success) return <div>{reviews.message}</div>;

	if (!reviews.reviews) return <div>No reviews found</div>;

	return (
		<div className='container bg-background'>
			<StatsSection reviews={reviews.reviews} />

			<ChartsSection reviews={reviews.reviews} />
		</div>
	);
}

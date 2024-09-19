import { CardTitle } from '@/components/ui/card';
import { getAllReviewsByProjectId } from '@/lib/query.services';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function ProjectReviews({
	params,
}: {
	params: {
		projectId: string;
	};
}) {
	const reviews = await getAllReviewsByProjectId(params.projectId);
	if (!reviews.success) return <div>{reviews.message}</div>;

	return (
		<>
			<CardTitle className='text-2xl'>Reviews from Customers</CardTitle>
			<DataTable columns={columns} data={reviews.reviews!} />
		</>
	);
}

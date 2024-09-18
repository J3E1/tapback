import { IReview } from '@/typings/types';
import { columns } from './columns';
import { DataTable } from './data-table';
import { getAllReviewsByProjectId } from '@/lib/query.services';

const data: IReview[] = [
	{
		id: 1,
		projectId: '1',
		email: 'a@a.com',
		feedback: 'test',
		rating: 'BAD',
		submittedAt: new Date(),
	},
	{
		id: 2,
		projectId: '1',
		email: 'a@a.com',
		feedback: 'test',
		rating: 'DECENT',
		submittedAt: new Date(),
	},
	{
		id: 3,
		projectId: '1',
		email: 'a@a.com',
		feedback: 'test',
		rating: 'LOVE_IT',
		submittedAt: new Date(),
	},
];

export default async function ProjectReviews({
	params,
}: {
	params: {
		projectId: string;
	};
}) {
	const reviews = await getAllReviewsByProjectId(params.projectId);
	if (!reviews.success) return <div>{reviews.message}</div>;

	return <DataTable columns={columns} data={reviews.reviews!} />;
}

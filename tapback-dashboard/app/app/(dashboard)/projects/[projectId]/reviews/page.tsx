import { CardTitle } from '@/components/ui/card';
import { getAllReviewsByProjectId } from '@/lib/query.services';
import { columns } from './columns';
import { DataTable } from './data-table';
import { MotionDiv } from '@/components/motion';
import { cardVariants } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Feedbacks',
};
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
			<MotionDiv variants={cardVariants} initial='hidden' animate='visible' exit='exit'>
				<CardTitle className='text-2xl'>Reviews from Customers</CardTitle>
			</MotionDiv>
			<DataTable columns={columns} data={reviews.reviews!} />
		</>
	);
}

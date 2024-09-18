import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
export default function ProjectsSkeleton() {
	return (
		<div className='container mx-auto p-4'>
			<Skeleton className='w-48 h-8 mb-4' />
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{[...Array(6)].map((_, index) => (
					<Card key={index} className='relative h-28'>
						<CardHeader>
							<Skeleton className='h-6 w-3/4 mb-2' />
							<Skeleton className='h-4 w-full' />
						</CardHeader>
						<CardContent>
							<Skeleton className='h-8 w-8 absolute top-2 right-2 rounded-full' />
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

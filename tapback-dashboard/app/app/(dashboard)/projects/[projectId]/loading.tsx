import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
export default function ProjectsSkeleton() {
	return (
		<Card className='relative'>
			<CardContent className='py-8'>
				<Skeleton className='w-48 h-8 mb-4' />
				<Skeleton className='h-6 w-full lg:w-3/4 mb-2' />
				<Skeleton className='h-6 w-full lg:w-3/4 mb-4' />
				<Skeleton className='h-6 w-full lg:w-3/4 mb-2' />
				<Skeleton className='h-6 w-full lg:w-3/4 mb-4' />
				<Skeleton className='h-6 w-full lg:w-3/4 mb-2' />
				<Skeleton className='h-6 w-full lg:w-3/4 mb-4' />
			</CardContent>
		</Card>
	);
}

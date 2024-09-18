import { getAllReviewsByProjectId } from '@/lib/query.services';

export interface IProject {
	id: string;
	name: string;
	siteUrl: string;
	description: string | null;
}

export interface IReview {
	id: number;
	projectId: string;
	email: string;
	feedback: string | null;
	rating: 'BAD' | 'DECENT' | 'LOVE_IT';
	submittedAt: Date;
}

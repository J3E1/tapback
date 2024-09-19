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

export interface IWidget {
	id: string;
	projectId: string;
	backgroundColor: string;
	primaryColor: string;
	typographyColor: string;
	radius: string;
	createdAt: Date;
	updatedAt: Date;
}

export const argonConfig = {
	memoryCost: 19456,
	timeCost: 2,
	outputLen: 32,
	parallelism: 1,
};

export const containerVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

export const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

export const dummyReview: {
	projectId: string;
	email: string;
	feedback: string;
	rating: 'BAD' | 'DECENT' | 'LOVE_IT';
	submittedAt: Date;
}[] = [
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user1@mail.com',
		feedback: 'Great experience using the platform.',
		rating: 'LOVE_IT',
		submittedAt: new Date('2023-09-21T08:10:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user2@mail.com',
		feedback: 'Could be better in some areas.',
		rating: 'DECENT',
		submittedAt: new Date('2024-01-10T15:30:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user3@mail.com',
		feedback: 'Not happy with the service.',
		rating: 'BAD',
		submittedAt: new Date('2023-11-05T12:00:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user4@mail.com',
		feedback: 'Very helpful for managing campaigns.',
		rating: 'LOVE_IT',
		submittedAt: new Date('2024-03-15T09:45:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user5@mail.com',
		feedback: 'Decent but needs more features.',
		rating: 'DECENT',
		submittedAt: new Date('2024-06-01T11:20:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user6@mail.com',
		feedback: 'Did not meet expectations.',
		rating: 'BAD',
		submittedAt: new Date('2023-10-12T14:00:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user7@mail.com',
		feedback: 'Love how it tracks everything!',
		rating: 'LOVE_IT',
		submittedAt: new Date('2024-04-20T10:10:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user8@mail.com',
		feedback: 'Performance could be faster.',
		rating: 'DECENT',
		submittedAt: new Date('2024-05-05T08:55:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user9@mail.com',
		feedback: 'Frustrating user experience.',
		rating: 'BAD',
		submittedAt: new Date('2023-12-01T17:30:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user10@mail.com',
		feedback: 'Very efficient for marketing teams.',
		rating: 'LOVE_IT',
		submittedAt: new Date('2024-07-09T13:40:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user11@mail.com',
		feedback: 'Not bad, but could be improved.',
		rating: 'DECENT',
		submittedAt: new Date('2024-02-21T19:00:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user12@mail.com',
		feedback: 'Really slow response times.',
		rating: 'BAD',
		submittedAt: new Date('2023-11-18T11:15:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user13@mail.com',
		feedback: 'Analytics dashboard is amazing!',
		rating: 'LOVE_IT',
		submittedAt: new Date('2024-01-15T09:20:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user14@mail.com',
		feedback: 'Fine for basic tracking.',
		rating: 'DECENT',
		submittedAt: new Date('2024-07-22T14:00:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user15@mail.com',
		feedback: 'So many bugs, unusable.',
		rating: 'BAD',
		submittedAt: new Date('2024-05-11T10:45:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user16@mail.com',
		feedback: 'Everything works flawlessly!',
		rating: 'LOVE_IT',
		submittedAt: new Date('2023-12-22T08:30:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user17@mail.com',
		feedback: 'Good but could have better UI.',
		rating: 'DECENT',
		submittedAt: new Date('2024-06-30T18:20:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user18@mail.com',
		feedback: 'Difficult to use.',
		rating: 'BAD',
		submittedAt: new Date('2023-09-26T12:45:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user19@mail.com',
		feedback: 'Perfect for marketing insights.',
		rating: 'LOVE_IT',
		submittedAt: new Date('2024-04-28T13:50:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user20@mail.com',
		feedback: 'Average user experience.',
		rating: 'DECENT',
		submittedAt: new Date('2024-03-10T16:40:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user21@mail.com',
		feedback: 'Had many issues, not great.',
		rating: 'BAD',
		submittedAt: new Date('2023-11-01T15:00:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user22@mail.com',
		feedback: 'Really powerful features!',
		rating: 'LOVE_IT',
		submittedAt: new Date('2024-01-30T09:35:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user23@mail.com',
		feedback: 'Pretty decent, no major issues.',
		rating: 'DECENT',
		submittedAt: new Date('2024-02-12T07:25:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user24@mail.com',
		feedback: 'Lots of bugs, needs improvement.',
		rating: 'BAD',
		submittedAt: new Date('2024-06-18T20:00:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user25@mail.com',
		feedback: 'This app is a game changer!',
		rating: 'LOVE_IT',
		submittedAt: new Date('2024-05-25T11:05:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user26@mail.com',
		feedback: 'Interface is okay but could be better.',
		rating: 'DECENT',
		submittedAt: new Date('2023-10-19T12:00:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user27@mail.com',
		feedback: 'System crashes a lot.',
		rating: 'BAD',
		submittedAt: new Date('2024-07-17T15:10:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user28@mail.com',
		feedback: 'Amazing marketing insights!',
		rating: 'LOVE_IT',
		submittedAt: new Date('2024-03-07T08:40:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user29@mail.com',
		feedback: 'Good, but more features are needed.',
		rating: 'DECENT',
		submittedAt: new Date('2024-02-05T13:55:00.000Z'),
	},
	{
		projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
		email: 'user30@mail.com',
		feedback: 'Frustrating, does not work properly.',
		rating: 'BAD',
		submittedAt: new Date('2023-12-08T18:25:00.000Z'),
	},
];

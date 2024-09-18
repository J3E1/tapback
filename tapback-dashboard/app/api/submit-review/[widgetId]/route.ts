// API to save review in db

import { NextRequest } from 'next/server';
import prismaClient from '@/lib/prisma-client';
import { addReview } from '@/lib/mutaion.actions';
import { dummyReview } from '@/lib/constants';

// export async function POST(req: NextRequest) {
// 	const widgetId = req.nextUrl.pathname.split('/').pop();
// 	console.log("🚀 ~ file: route.ts:9 ~ POST ~ widgetId:", widgetId);
// 	const { email, feedback, rating } = await req.json();

// 	// const project = await prismaClient.project.findUnique({
// 	// 	where: {
// 	// 		id: widgetId!,
// 	// 	},
// 	// });

// 	// if (!project) {
// 	// 	return new Response(JSON.stringify({ success: false, error: 'Project not found' }));
// 	// }

// 	try {
// 		const response = await addReview({
// 			projectId: widgetId!,
// 			email,
// 			feedback,
// 			rating,
// 		});
// 		if (!response.success) return new Response(JSON.stringify({ success: false, error: response.error }));
// 		return new Response(JSON.stringify({ success: true }));
// 	} catch (error) {
// 		console.log("🚀 ~ file: route.ts:31 ~ POST ~ error:", error);
// 		return new Response(JSON.stringify({ success: false, error: 'Something went wrong' }));
// 	}
// }
export async function POST(req: NextRequest) {
	const widgetId = req.nextUrl.pathname.split('/').pop();
	console.log("🚀 ~ file: route.ts:9 ~ POST ~ widgetId:", widgetId);

	try {
        const reviews = await prismaClient.review.createMany({
            data: dummyReview
        })
        console.log("🚀 ~ file: route.ts:45 ~ POST ~ reviews:", reviews);
		return new Response(JSON.stringify({ success: true }));
	} catch (error) {
		console.log("🚀 ~ file: route.ts:31 ~ POST ~ error:", error);
		return new Response(JSON.stringify({ success: false, error: 'Something went wrong' }));
	}
}

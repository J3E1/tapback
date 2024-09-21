// API to save review in db
import prismaClient from '@/lib/prisma-client';
import { submitReviewSchema } from '@/lib/schemas';
import { NextRequest } from 'next/server';

/**
 * POST /api/submit-review/:widgetId
 *
 * Save a review in the database
 *
 * @param {NextRequest} req - The request object
 * @param {string} req.body.email - The email of the reviewer
 * @param {string} req.body.feedback - The feedback given by the reviewer
 * @param {"BAD" | "DECENT" | "LOVE_IT"} req.body.rating - The rating given by the reviewer
 *
 * @returns {Promise<Response>}
 */
export async function POST(req: NextRequest): Promise<Response> {
	try {
		const widgetId = req.nextUrl.pathname.split('/').pop();
		const body = await req.json();

		const result = submitReviewSchema.safeParse(body);
		if (!result.success) {
			return new Response(
				JSON.stringify({ success: false, error: result.error.message })
			);
		}

		const { email, feedback, rating } = result.data;

		const widget = await prismaClient.widget.findUnique({
			where: {
				id: widgetId!,
			},
		});

		if (!widget) {
			return new Response(
				JSON.stringify({ success: false, error: 'Not found' })
			);
		}

		await prismaClient.review.create({
			data: {
				projectId: widget.projectId,
				email,
				feedback,
				rating,
			},
		});

		return new Response(JSON.stringify({ success: true }));
	} catch (error) {
		console.log('🚀 ~ file: route.ts:31 ~ POST ~ error:', error);
		return new Response(
			JSON.stringify({ success: false, error: 'Something went wrong' })
		);
	}
}
// export async function POST(req: NextRequest) {
// 	const widgetId = req.nextUrl.pathname.split('/').pop();
// 	console.log('🚀 ~ file: route.ts:9 ~ POST ~ widgetId:', widgetId);

// 	try {
// 		const reviews = await prismaClient.review.createMany({
// 			data: dummyReview,
// 		});
// 		return new Response(JSON.stringify({ success: true }));
// 	} catch (error) {
// 		console.log('🚀 ~ file: route.ts:31 ~ POST ~ error:', error);
// 		return new Response(
// 			JSON.stringify({ success: false, error: 'Something went wrong' })
// 		);
// 	}
// }

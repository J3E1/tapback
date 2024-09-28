// API to save review in db
import prismaClient from '@/lib/prisma-client';
import { submitReviewSchema } from '@/lib/schemas';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

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
 * @returns {Promise<NextResponse>}
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const widgetId = req.nextUrl.pathname.split('/').pop();
		const body = await req.json();

		const result = submitReviewSchema.safeParse(body);
		if (!result.success) {
			return new NextResponse(JSON.stringify({ success: false, error: result.error.errors[0].message }), { status: 400 });
		}

		const { email, feedback, rating } = result.data;

		const widget = await prismaClient.widget.findUnique({
			where: {
				id: widgetId!,
			},
			select: {
				project: {
					select: {
						user: {
							select: {
								pricingPlan: {
									select: {
										reviewsLimit: true,
									},
								},
							},
						},
						siteUrl: true,
					},
				},
				projectId: true,
			},
		});
		if (!widget) {
			return new NextResponse(JSON.stringify({ success: false, error: 'Project not found' }), { status: 404 });
		}
		const requestOrigin = req.headers.get('origin'); // Get the origin of the request
		const widgetSiteUrl = widget.project?.siteUrl;

		if (widgetSiteUrl && requestOrigin) {
			// Compare only the hostname to avoid issues with different protocols/ports
			const requestHostname = new URL(requestOrigin).hostname;
			const widgetHostname = new URL(widgetSiteUrl).hostname;

			// Ensure the request is coming from the correct domain
			if (requestHostname !== widgetHostname) {
				return new NextResponse(JSON.stringify({ success: false, error: 'Invalid request' }), { status: 403 });
			}
		} else {
			// If siteUrl or origin is missing, you might want to handle this differently.
			return new NextResponse(JSON.stringify({ success: false, error: 'Invalid request origin or widget site URL' }), { status: 403 });
		}
		const reviewCount = await prismaClient.review.count({
			where: {
				projectId: widget.projectId,
			},
		});

		if (widget.project?.user?.pricingPlan?.reviewsLimit !== undefined && reviewCount >= widget.project.user.pricingPlan.reviewsLimit) {
			return new NextResponse(JSON.stringify({ success: false, error: 'Plan limit reached' }), { status: 400 });
		}

		await prismaClient.review.create({
			data: {
				projectId: widget.projectId,
				email,
				feedback,
				rating,
			},
		});

		return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		if (error instanceof ZodError) {
			return new NextResponse(JSON.stringify({ success: false, error: error.issues[0].message }), { status: 400 });
		}
		console.log('Error submitting review:', error);
		return new NextResponse(JSON.stringify({ success: false, error: 'Something went wrong' }), { status: 500 });
	}
}

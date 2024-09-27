import prismaClient from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { widgetId: string } }) {
	try {
		const widget = await prismaClient.widget.findUnique({
			where: { id: params.widgetId },
			select: {
				id: true,
				backgroundColor: true,
				primaryColor: true,
				typographyColor: true,
				radius: true,
			},
		});

		if (!widget) return new NextResponse(JSON.stringify({ error: 'Not found' }), { status: 404 });

		return new NextResponse(JSON.stringify(widget));
	} catch (error) {
		console.error("Error fetching widget:", error);
		return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
	}
}

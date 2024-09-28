import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { Lucia, Session, UserId } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';
import prismaClient from './prisma-client';
import { $Enums, PricingPlan } from '@prisma/client';

const adapter = new PrismaAdapter(prismaClient.session, prismaClient.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === 'production',
		},
	},
	getUserAttributes: attributes => {
		return {
			// attributes has the type of DatabaseUserAttributes
			name: attributes.name,
			email: attributes.email,
			pricingPlan: attributes.pricingPlan,
		};
	},
});

export const validateRequest = cache(
	async (): Promise<
		| {
				user: {
					pricingPlan: {
						id: string;
						reviewsLimit: number;
						projectLimit: number;
						name: $Enums.Plan;
						price: string;
					} | null;
					id: UserId;
					name: string;
					email: string;
				};
				session: Session;
		  }
		| { user: null; session: null }
	> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null,
			};
		}
		let pricingPlan: PricingPlan | null = null;
		const result = await lucia.validateSession(sessionId);
		if (result.user) {
			const user = await prismaClient.user.findUnique({
				where: {
					id: result.user.id,
				},
				include: {
					pricingPlan: true,
				},
			});
			pricingPlan = user?.pricingPlan || null;
		}

		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}

		if (result.session && result.user) {
			return {
				user: { ...result.user, pricingPlan },
				session: result.session,
			};
		} else {
			return {
				user: null,
				session: null,
			};
		}
	}
);

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}
interface DatabaseUserAttributes {
	name: string;
	email: string;
	pricingPlan: PricingPlan;
}

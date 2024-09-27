'use server';

import { lucia, validateRequest } from '@/lib/auth';
import { hash, verify } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';
import { cookies } from 'next/headers';
import { argonConfig } from './constants';
import prismaClient from './prisma-client';
import {
	loginSchema,
	LoginSchema,
	RegisterSchema,
	registerSchema,
} from './schemas';

/**
 * Registers a new user in the database and creates a new session for it.
 * @param formData - The form data passed from the client.
 * @returns - An object with a success boolean and a message or error string.
 */
export async function register(formData: RegisterSchema) {
	const values = registerSchema.safeParse(formData);
	if (values.success) {
		const { name, email, password } = values.data;

		// Hash the user's password using Argon2.
		const passwordHash = await hash(password, argonConfig);

		// Generate a unique identifier for the user.
		const userId = generateIdFromEntropySize(10); // 16 characters long

		// Find basic plan id.
		const basicPlan = await prismaClient.pricingPlan.findFirst({
			where: {
				name: 'BASIC',
			},
			select: {
				id: true,
			}
		});

		// Create a new user in the database.
		const user = await prismaClient.user.create({
			data: {
				id: userId,
				name: name,
				email: email.toLowerCase(),
				password: passwordHash,
				pricingPlanId: basicPlan?.id,
			},
			include: {
				pricingPlan: true,
			}
		});

		// Create a new session for the user.
		const session = await lucia.createSession(userId, { plan: user.pricingPlan?.name, projectLimit: user.pricingPlan?.projectLimit || 0 });

		// Set the session cookie on the client.
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);

		// Return a success message to the client.
		return {
			message: 'Registered successfully',
			success: true,
		};
	} else {
		// Return an error message to the client.
		return {
			success: false,
			error: values.error.message,
		};
	}
}

/**
 * Logs in an existing user and creates a new session for it.
 * @param formData - The form data passed from the client.
 * @returns - An object with a success boolean and a message or error string.
 */
export async function login(formData: LoginSchema) {
	const values = loginSchema.safeParse(formData);
	if (values.success) {
		const { email, password } = values.data;

		// Find the user in the database.
		const existingUser = await prismaClient.user.findUnique({
			where: { email: email.toLowerCase() },
			include: {
				pricingPlan: true,
			}
		});

		// If the user doesn't exist, return an error.
		if (!existingUser) {
			return { success: false, error: 'Incorrect email or password' };
		}

		// Verify the user's password using Argon2.
		const validPassword = await verify(
			existingUser.password,
			password,
			argonConfig
		);

		// If the password is invalid, return an error.
		if (!validPassword) {
			return { success: false, error: 'Incorrect email or password' };
		}

		// Create a new session for the user.
		const session = await lucia.createSession(existingUser.id,  { });

		// Set the session cookie on the client.
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
		return {
			message: 'Logged in successfully',
			success: true,
		};
	} else {
		// Return an error message to the client.
		return {
			success: false,
			error: values.error.message,
		};
	}
}

/**
 * Logs out the current user and clears the session cookie.
 * @returns - An object with a success boolean and a message or error string.
 */
export async function logout() {
	const { session } = await validateRequest();
	if (!session) {
		return {
			success: false,
			error: 'Unauthorized',
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return {
		success: true,
		message: 'Logged out successfully',
	};
}

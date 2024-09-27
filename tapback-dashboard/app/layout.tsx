import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import { validateRequest } from '@/lib/auth';
import type { Metadata } from 'next';
import './globals.css';
import { getPricingPlanByUserId } from '@/lib/query.services';

export const metadata: Metadata = {
	title: {
		default: 'TapBack - Customer Feedback Widget for Websites',
		template: '%s | TapBack',
	},
	description:
		'TapBack: Create customizable feedback widgets for your website. Embed with a single line of code and start collecting valuable customer insights instantly.',
	keywords: ['customer feedback', 'website widget', 'user insights', 'customer experience', 'feedback collection', 'SaaS', 'analytics dashboard'],
	authors: [{ name: 'J3E1' }],
	creator: 'J3E1',
	publisher: 'J3E1',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title: 'TapBack - Effortless Customer Feedback Collection',
		description:
			'Embed customizable feedback widgets on your website with a single line of code. Gather insights, analyze data, and improve customer experience.',
		url: 'https://www.tapback.com',
		siteName: 'TapBack',
		images: [
			{
				url: 'https://www.tapback.com/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'TapBack customer feedback widget showcase',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'TapBack - Customer Feedback Made Simple',
		description: 'Create, customize, and embed feedback widgets. One line of code to start collecting valuable customer insights.',
		creator: '@tapback',
		images: ['https://www.tapback.com/twitter-image.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
		icon: '/logo.svg',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
	// manifest: '/manifest.json',
	category: 'Technology',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user } = await validateRequest();
	const userData = user
		? {
				id: user.id,
				name: user.name,
				email: user.email,
				plan: user.pricingPlan?.name || 'BASIC',
		  }
		: null;
	return (
		<html lang='en'>
			<body className={`antialiased min-h-screen flex flex-col`}>
				<ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
					<SiteHeader user={userData} />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

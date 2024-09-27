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

export const accordionData = [
	{
		question: 'What is TapBack?',
		answer:
			'TapBack is a feedback collection tool that lets you create and embed feedback widgets on your website. It helps gather customer feedback and provides insights through a user-friendly dashboard.',
	},
	{
		question: 'How do I embed the TapBack widget on my website?',
		answer:
			"After creating your widget, simply copy and paste the provided script tag into your website's HTML to start collecting feedback instantly.",
	},
	{
		question: 'Can I customize the look and feel of the widget?',
		answer:
			"Yes, you can fully customize the widget to match your brand's style, including colors, fonts, and layout.",
	},
	{
		question: 'Is TapBack suitable for any website?',
		answer:
			'TapBack works with all types of websites, from WordPress and Shopify to custom-built platforms.',
	},
	{
		question: 'What insights can I track on the dashboard?',
		answer:
			'The TapBack dashboard provides feedback submissions, customer sentiment, and user engagement analytics, helping you improve customer satisfaction.',
	},
	{
		question: 'Is there a free version of TapBack?',
		answer:
			'Yes, TapBack offers a free tier with basic features. For advanced features, you can upgrade to a paid plan.',
	},
];

export const pricingPlans = [
	{
		name: 'Basic',
		price: '$0/month',
		description: 'Perfect for small websites and startups',
		features: [
			'Up to 100 feedback responses/month',
			'1 project/customizable widget',
			'Full widget customization',
			'Dashboard with basic analytics',
		],
	},
	{
		name: 'Pro',
		price: '$19/month',
		description: 'Ideal for growing businesses and e-commerce sites',
		features: [
			'Up to 1,000 feedback responses/month',
			'3 customizable widgets',
			'Full widget customization',
			'Comprehensive analytics dashboard',
			'Data export (CSV, JSON)',
		],
	},
	{
		name: 'Enterprise',
		price: 'Custom',
		description: 'For large-scale websites and organizations',
		features: [
			'Unlimited feedback responses',
			'Unlimited customizable widgets',
			'Full widget customization',
			'24/7 dedicated support',
			'Advanced analytics',
			'Single Sign-On (SSO)',
			'Dedicated account manager',
			'Data export (CSV, JSON)',
		],
	},
];

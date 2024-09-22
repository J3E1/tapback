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

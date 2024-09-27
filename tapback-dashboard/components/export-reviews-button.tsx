'use client';
import { useState } from 'react';
import { Parser } from 'json2csv';
import { MotionButton } from './motion';

const fields = ['id', 'email', 'feedback', 'rating', 'submittedAt'];
type Props = { reviews: any[] };
export default function ExportReviewsButton({ reviews }: Props) {
	const [loading, setLoading] = useState(false);

	// Function to handle exporting reviews
	const exportReviewsToCSV = async () => {
		setLoading(true);
		try {
			// Convert reviews to CSV format
			const json2csvParser = new Parser({ fields });
			reviews.forEach(review => {
				review.submittedAt = new Date(review.submittedAt).toISOString();
			});
			const csvData = json2csvParser.parse(reviews);

			// Create a Blob from the CSV data and create a download link
			const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
			const url = URL.createObjectURL(blob);

			// Create a temporary link element to trigger the download
			const link = document.createElement('a');
			link.href = url;
			const now = new Date();
			const dateString = now.toISOString().replace(/[:.]/g, '-');
			link.setAttribute('download', `reviews-${dateString}.csv`);
			document.body.appendChild(link);
			link.click();

			// Clean up by removing the link and releasing the URL object
			link.parentNode?.removeChild(link);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error exporting reviews:', error);
		} finally {
			setLoading(false);
		}
	};
	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 24,
			},
		},
	};
	return (
		<MotionButton
			onClick={exportReviewsToCSV}
			disabled={loading}
			variants={itemVariants}
			variant='outline'
			className='ml-auto'
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			Export
		</MotionButton>
	);
}

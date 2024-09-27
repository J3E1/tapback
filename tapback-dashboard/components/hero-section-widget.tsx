'use client';
import { useEffect, useState } from 'react';
import Widget from './widget';

const bgColors = ['270, 79%, 95%', '0, 72%, 95%', '25, 95%, 95%', '43, 96%, 95%', '226, 71%, 95%'];
const primaryColors = [
	'270, 79%, 56%', // purple-600
	'0, 72%, 51%', // red-600
	'25, 95%, 53%', // orange-600
	'43, 96%, 50%', // yellow-600
	'226, 71%, 40%', // indigo-600
];

export default function HeroSectionWidget() {
	const [colorIndex, setColorIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setColorIndex(prevIndex => (prevIndex + 1) % bgColors.length);
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	const containerStyle = {
		'--primary': primaryColors[colorIndex],
		'--background': bgColors[colorIndex],
		'--typography': '240, 3.7%, 15.9%',
        transition: 'all 0.2s ease-in-out'
	} as React.CSSProperties;
	return (
		<div style={containerStyle}>
			<Widget />
		</div>
	);
}

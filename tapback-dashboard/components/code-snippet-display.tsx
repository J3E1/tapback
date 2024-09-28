'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from './ui/button';
import { MotionDiv } from './motion';
import { cardVariants, containerVariants } from '@/lib/constants';

export default function CodeSnippetDisplay({ widgetId }: { widgetId: string }) {
	const [isCopied, setIsCopied] = useState(false);

	const srcToWidget = process.env.NEXT_PUBLIC_WIDGET_DOWNLOAD_URL;
	console.log("🚀 ~ file: code-snippet-display.tsx:16 ~ CodeSnippetDisplay ~ srcToWidget:", srcToWidget);

	const codeSnippet = `
					<script src="${srcToWidget}" data-widget-id="${widgetId}" defer></script>
				`.trim();

	const copyToClipboard = () => {
		navigator.clipboard.writeText(codeSnippet).then(() => {
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		});
	};

	return (
		<MotionDiv variants={containerVariants} initial='hidden' animate='visible'>
			<Card className='w-full'>
				<CardHeader>
					<MotionDiv variants={cardVariants}>
						<CardTitle className='text-2xl'>Code Snippet</CardTitle>
						<CardDescription>
							Copy below code for your widget and paste it in your webpage&apos;s head to start
							collaborating feedback.
						</CardDescription>
					</MotionDiv>
				</CardHeader>
				<CardContent>
					<MotionDiv variants={cardVariants} className='relative w-full max-w-4xl'>
						<SyntaxHighlighter
							language='html'
							style={atomDark}
							customStyle={{
								padding: '1.5rem',
								borderRadius: 'var(--radius)',
								fontSize: '0.875rem',
								lineHeight: '1.5',
								overflow: 'auto',
							}}
							wrapLines={true}
							wrapLongLines={true}>
							{codeSnippet}
						</SyntaxHighlighter>
						<Button
							variant='secondary'
							size='sm'
							className='absolute top-0 right-0 bg-secondary/60 backdrop-blur supports-[backdrop-filter]:bg-secondary/40'
							onClick={copyToClipboard}>
							{isCopied ? (
								<>
									<Check className='w-4 h-4 mr-2' />
									Copied!
								</>
							) : (
								<>
									<Copy className='w-4 h-4 mr-2' />
									Copy
								</>
							)}
						</Button>
					</MotionDiv>
				</CardContent>
			</Card>
		</MotionDiv>
	);
}

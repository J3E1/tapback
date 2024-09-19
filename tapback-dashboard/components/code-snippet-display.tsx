'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from './ui/button';

export default function CodeSnippetDisplay({ widgetId }: { widgetId: string }) {
	const [isCopied, setIsCopied] = useState(false);

	const srcToWidget = process.env.WIDGET_DOWNLOAD_LINK || 'https://v0.dev/';

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
		<Card className='w-full'>
			<CardHeader>
				<CardTitle className='text-2xl'>Code Snippet</CardTitle>
				<CardDescription>
					Copy below code for your widget and paste it in your webpage&apos;s
					head to start collaborating feedback.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='relative w-full max-w-4xl py-4'>
					<SyntaxHighlighter
						language='html'
						style={atomDark}
						customStyle={{
							padding: '1.5rem',
							borderRadius: '0.5rem',
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
						className='absolute top-6 right-0 bg-secondary/60 backdrop-blur supports-[backdrop-filter]:bg-secondary/40'
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
				</div>
			</CardContent>
		</Card>
	);
}

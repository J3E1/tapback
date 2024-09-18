'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeSnippetDisplay() {
	const [isCopied, setIsCopied] = useState(false);

	const srcToWidget = 'https://v0.dev/';
	const projectId = 'your-api-key';

	const codeSnippet = `
            <script src="${srcToWidget}" data-project-id="${projectId}"></script>
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
				<CardDescription>Copy below code to your widget and paste it in your project to start collaborating feedback.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='relative overflow-x-scroll no-scrollbar max-w-[45rem]'>
					<SyntaxHighlighter
						language='html'
						style={atomDark}
						customStyle={{
							padding: 'clamp(0.75rem, 2vw, 1.5rem)', // Adjust padding to scale with viewport size
							borderRadius: 'var(--radius)',
							fontSize: 'clamp(0.75rem, 1.5vw, 0.89rem)', // Adjust font size responsively
							wordWrap: 'break-word', // Force wrapping of long lines
							whiteSpace: 'pre-wrap', // Preformatted text with wrapping
							overflowX: 'hidden', // Prevent horizontal scrollbars
						}}
						wrapLines={true}>
						{codeSnippet}
					</SyntaxHighlighter>
					<Button
						variant='secondary'
						size='sm'
						className='absolute top-3 right-1'
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

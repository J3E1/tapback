import {
	AlertCircle,
	Archive,
	ArchiveX,
	File,
	Inbox,
	MessagesSquare,
	Search,
	Send,
	ShoppingCart,
	Trash2,
	Users2,
} from 'lucide-react';
import Sidebar from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ProjectSwitcher } from '@/components/project-switcher';

export default function LandingPage() {
	return (
		<div className='flex-grow flex'>
			<TooltipProvider delayDuration={0}>
				<Sidebar
					isCollapsed={false}
					links={[
						{
							title: 'Inbox',
							label: '128',
							icon: Inbox,
							variant: 'default',
						},
						{
							title: 'Drafts',
							label: '9',
							icon: File,
							variant: 'ghost',
						},
						{
							title: 'Sent',
							label: '',
							icon: Send,
							variant: 'ghost',
						},
						{
							title: 'Junk',
							label: '23',
							icon: ArchiveX,
							variant: 'ghost',
						},
						{
							title: 'Trash',
							label: '',
							icon: Trash2,
							variant: 'ghost',
						},
						{
							title: 'Archive',
							label: '',
							icon: Archive,
							variant: 'ghost',
						},
					]}
				/>
			</TooltipProvider>
			<main className='flex flex-col sm:gap-4 p-4'>Content</main>
		</div>
	);
}

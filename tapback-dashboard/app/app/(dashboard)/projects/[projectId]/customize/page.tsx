import ColorPicker from '@/components/color-picker';
import { getWidgetByProjectId } from '@/lib/query.services';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Customize Widget',
};
export default async function CustomizeWidget({ params }: { params: { projectId: string } }) {
	const widget = await getWidgetByProjectId(params.projectId);

	return (
		<div>
			<ColorPicker projectId={params.projectId} widget={widget.widget} />
		</div>
	);
}

import ColorPicker from '@/components/color-picker';
import { getWidgetByProjectId } from '@/lib/query.services';

export default async function CustomizeWidget({
	params,
}: {
	params: { projectId: string };
}) {
	const widget = await getWidgetByProjectId(params.projectId);

	return (
		<div>
			<ColorPicker projectId={params.projectId} widget={widget.widget} />
		</div>
	);
}

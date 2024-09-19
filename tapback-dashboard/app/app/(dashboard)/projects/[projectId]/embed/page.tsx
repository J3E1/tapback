import CodeSnippetDisplay from '@/components/code-snippet-display';
import { getWidgetByProjectId } from '@/lib/query.services';

export default async function EmbedWidget({
	params,
}: {
	params: { projectId: string };
}) {
	const result = await getWidgetByProjectId(params.projectId);

	if (!result.widget) return <div>Widget not found</div>;

	return (
		<div>
			<CodeSnippetDisplay widgetId={result.widget.id} />
		</div>
	);
}

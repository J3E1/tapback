import App from './App.tsx';
import './index.css';
import { createRoot } from 'react-dom/client';

// Capture the current script when the file loads
const currentScript = document.currentScript as HTMLScriptElement;

// Function to render the widget
function renderFeedbackWidget() {
    // Extract data attributes (e.g., API key, other values)
    const widgetId = currentScript?.getAttribute('data-widget-id');

    // Create a container div and append it to the body
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'widget-container-root';
    document.body.appendChild(widgetContainer);

    // Render the widget in the container
    createRoot(widgetContainer).render(<App widgetId={widgetId!}/>);
}

// Automatically render the widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
	renderFeedbackWidget();
});

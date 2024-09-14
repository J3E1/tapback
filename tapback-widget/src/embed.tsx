import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';

// Function to render the widget
function renderFeedbackWidget() {
	// Get the current script tag that loaded this widget
	// const currentScript = document.currentScript as HTMLScriptElement;

	// Extract data attributes (e.g., API key, other values)
	// const apiKey = currentScript?.getAttribute('data-api-key');
	// Create a container div and append it to the body
	const widgetContainer = document.createElement('div');
	widgetContainer.id = 'widget-container-root';
	document.body.appendChild(widgetContainer);

	// Render the widget in the container
	ReactDOM.render(<App />, widgetContainer);
}

// Automatically render the widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
	renderFeedbackWidget();
});

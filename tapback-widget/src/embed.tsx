import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';

// Function to render the widget
function renderFeedbackWidget() {
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

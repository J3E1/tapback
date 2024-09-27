import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import DemoLandingPage from './demo-landing-page.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App widgetId='08778c4c-6744-4e6c-a216-cb3389bf6033'/>
		<DemoLandingPage />
	</StrictMode>
);

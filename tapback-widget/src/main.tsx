import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import DemoLandingPage from './demo-landing-page.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
		<DemoLandingPage />
	</StrictMode>
);

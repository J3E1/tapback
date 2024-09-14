import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import vitePluginCssInjectedByJs from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), vitePluginCssInjectedByJs()],
	define: {
		'process.env': {
			NODE_ENV: 'production',
		},
	},
	build: {
		lib: {
			entry: './src/embed.tsx', // Path to your React component
			name: 'TapBackWidget', // Name of the library
			fileName: format => `tapback-widget.${format}.js`, // Output file name pattern
		},
		target: 'esnext',
	},
});

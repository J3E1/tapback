import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import vitePluginCssInjectedByJs from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react(), vitePluginCssInjectedByJs()],
    define: {
      'process.env': {
        NODE_ENV: 'production',
        MY_CUSTOM_VARIABLE: JSON.stringify(env.VITE_API_HOST),
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
  }
});

// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables.
  // The third argument '' ensures ALL variables are loaded, not just VITE_ prefixed ones.
  const env = loadEnv(mode, process.cwd(), '');

  // Log the loaded environment variables to the console during build
  // This is a DEBUG step to ensure 'env' actually contains something.
  console.log('Vite Loaded Env Variables:', env);

  return {
    plugins: [react()],
    define: {
      // THIS IS THE KEY PART for process.env
      'process.env': JSON.stringify(env),
      // If the error specifically mentions __DEFINES__, and not process.env,
      // it means some code is trying to access a global named __DEFINES__.
      // We can try to explicitly define it, though this is a workaround for
      // a potentially problematic library.
      '__DEFINES__': JSON.stringify({ /* You might need to put specific values here if known */ }),
      // A more robust but hacky way if you truly need a global __DEFINES__ for a library:
      // '__DEFINES__': '({})', // Define it as an empty object if you don't know what it expects
    },
  };
});
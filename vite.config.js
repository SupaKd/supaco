import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Cible les navigateurs modernes pour réduire le polyfill overhead
    target: 'es2020',
    // Split CSS par chunk pour ne charger que les styles nécessaires
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-icons': ['react-icons', 'lucide-react']
        }
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      }
    },
    chunkSizeWarningLimit: 600,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
        dead_code: true,
        unused: true,
      },
      format: {
        comments: false,
      }
    },
    cssMinify: true,
    // Assets < 4kb inlinés (réduit les requêtes réseau)
    assetsInlineLimit: 4096,
    // Pas de source maps en prod
    sourcemap: false,
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})

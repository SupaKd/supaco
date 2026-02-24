import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Cible les navigateurs modernes pour réduire le polyfill overhead
    target: 'es2020',
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
        // Supprimer le code mort
        dead_code: true,
        unused: true,
      },
      format: {
        comments: false,
      }
    },
    cssMinify: true,
    // Assets < 2kb inlinés (réduit les requêtes réseau sur mobile)
    assetsInlineLimit: 2048,
    // Pas de source maps en prod (réduit le temps de build et la taille)
    sourcemap: false,
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})

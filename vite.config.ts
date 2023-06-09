import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
	port: 3000
  },
  resolve: {
	alias: {
		'@/': path.resolve(__dirname, './src'),
		'@/app': path.resolve(__dirname, './src/app'),
		'@/theme': path.resolve(__dirname, './src/theme'),
		'@/types': path.resolve(__dirname, './src/types'),
		'@/stores': path.resolve(__dirname, './src/stores'),
		'@/components': path.resolve(__dirname, './src/components'),
		'@/api': path.resolve(__dirname, './src/api'),
		'@/socket': path.resolve(__dirname, './src/socket')
	}
  }
})

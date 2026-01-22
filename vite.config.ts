// vite.config.ts — ФИНАЛЬНАЯ версия для https://Stas512.github.io/front/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // ← Обязательно для repo "front"
})

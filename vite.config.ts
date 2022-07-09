import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({
    imports:['vue'],
    dts: 'types/auto-import.d.ts'
  })],
});

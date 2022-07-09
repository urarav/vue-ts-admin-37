import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
      // dts: "types/auto-import.d.ts",
      dts: true,
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dirs: ["src/views"], // 默认就是识别src/views文件，该文件夹下的所有组件都会自动 import
      dts: "types/components.d.ts",
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
});

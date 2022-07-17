const path = require("path");
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    //fix "path" module issue
    "process.platform": null,
    "process.version": null,
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],
      dts: "types/auto-import.d.ts",
      // dts: true,
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
    }),
    Components({
      // 默认就是识别src/views文件，该文件夹下的所有组件都会自动 import
      dirs: ["src"],
      dts: "types/components.d.ts",
      resolvers: [
        // 自动注册图标组件，这里要把 @element-plus/icons-vue换成@iconify-json/ep
        IconsResolver({
          enabledCollections: ["ep"],
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    // https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [
        path.resolve(process.cwd(), "src/icons"),
        // path.resolve(process.cwd(), "src/icons/common"),
        // path.resolve(process.cwd(), "src/icons/sidebar"),
      ],
      // 指定symbolId格式
      // symbolId: "icon-[name]",
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
});

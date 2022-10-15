import { createApp } from "vue";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import directives from "./directives";
import "@/styles/index.scss";
import "@/utils/permission";
import "virtual:svg-icons-register";

createApp(App).use(directives).use(router).use(store).mount("#app");

import { createApp } from "vue";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import router from "./router";
import store from "./store";
import "@/styles/index.scss";
import App from "./App.vue";

createApp(App).use(router).use(store).mount("#app");

import { createApp } from "vue";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import "@/styles/index.scss";
import "@/router/permission";
import "virtual:svg-icons-register";

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");

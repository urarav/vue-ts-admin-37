import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/login", component: () => import("@/views/login/index.vue") },
  { path: "/home", component: () => import("@/views/dashboard/index.vue") },
  { path: "/", redirect: "/home" },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

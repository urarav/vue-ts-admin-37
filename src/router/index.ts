import { createRouter, createWebHashHistory, Router } from "vue-router";
import { constantRoutes } from "./constantRoutes";

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export function resetRouter() {
  try {
    for (const route of router.getRoutes()) {
      const { name, meta } = route;
      if (name && meta.roles && (meta.roles as string[]).length) {
        router.hasRoute(name) && router.removeRoute(name);
      }
    }
    router.push("/login");
  } catch {
    window.location.reload();
  }
}

export default router;

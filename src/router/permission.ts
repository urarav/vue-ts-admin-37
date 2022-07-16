import router from "@/router";
import { getToken } from "@/utils/cookie";
import { useUserStoreHook } from "@/store/modules/user";
import { usePermissionStoreHook } from "@/store/modules/permission";
const userStore = useUserStoreHook();
const permissionStore = usePermissionStoreHook();
const whiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  if (hasToken) {
    // 已登录
    if (to.path === "/login") {
      next("/");
    } else {
      if (!userStore.roles.length) {
        const roles = await userStore.getUserInfo();
        permissionStore.generateRoutes(roles);
        for (const route of permissionStore.dynamicRoutes) {
          router.addRoute(route);
        }
        next({ ...to, replace: true });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

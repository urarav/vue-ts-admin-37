import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken, removeToken } from "@/utils/cookie";
import { useUserStoreHook } from "@/store/modules/user";
import { usePermissionStoreHook } from "@/store/modules/permission";

const userStore = useUserStoreHook();
const permissionStore = usePermissionStoreHook();
const whiteList = ["/login"];
NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const hasToken = getToken();
  if (hasToken) {
    // 已登录
    if (to.path === "/login") {
      next("/");
    } else {
      if (userStore.roles.length) {
        next();
      } else {
        try {
          const roles = await userStore.getUserInfo();
          permissionStore.generateRoutes(roles);
          for (const route of permissionStore.dynamicRoutes) {
            router.addRoute(route);
          }
          next({ ...to, replace: true });
        } catch (e) {
          removeToken()
          next(`/login?redirect=${to.path}`);
        }
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

router.afterEach(() => NProgress.done());

import router from "@/router";
import { getToken } from "@/utils/cookie";
import { useUserStoreHook } from "@/store/modules/user";
const { getUserInfo, roles } = useUserStoreHook();
const whiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  debugger;
  if (hasToken) {
    // 已登录
    if (to.path === "/login") {
      next("/");
    } else {
      if (!roles.length) {
        const a = await getUserInfo();
        debugger;
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

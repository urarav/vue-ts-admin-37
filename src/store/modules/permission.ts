import { defineStore } from "pinia";
import type { TPermissionState } from "~/store";
import { constantRoutes, asyncRoutes } from "@/router";
import { RouteRecordRaw } from "vue-router";
import store from "..";

function hasPermission(route: RouteRecordRaw, roles: string[]): boolean {
  if (route.meta && route.meta.roles) {
    return roles.some((role) =>
      (route.meta!.roles as Array<string>).includes(role)
    );
  } else {
    return true;
  }
}

function filterAsyncRoutes(
  asyncRoutes: RouteRecordRaw[],
  roles: string[]
): RouteRecordRaw[] {
  const resRoutes: RouteRecordRaw[] = [];
  for (const asyncRoute of asyncRoutes) {
    const tempRoute = { ...asyncRoute };
    if (hasPermission(tempRoute, roles)) {
      if (tempRoute.children) {
        tempRoute.children = filterAsyncRoutes(tempRoute.children, roles);
      }
      resRoutes.push(tempRoute);
    }
  }
  return resRoutes;
}

export const usePermissionStore = defineStore({
  id: "permissionStore",
  state(): TPermissionState {
    return {
      routes: [],
      dynamicRoutes: [],
    };
  },
  actions: {
    generateRoutes(roles: string[]) {
      const accessRoutes = roles.includes("admin")
        ? asyncRoutes
        : filterAsyncRoutes(asyncRoutes, roles);
      this.routes = constantRoutes.concat(accessRoutes);
      this.dynamicRoutes = accessRoutes;
    },
  },
  getters: {
    getRoutes(): Array<RouteRecordRaw> {
      return this.routes;
    },
  },
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}

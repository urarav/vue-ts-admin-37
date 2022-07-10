import { defineStore } from "pinia";
import type { TpermissionState } from "~/store";
import store from "@/store";

export const usePermissionStore = defineStore({
  id: "permissionStore",
  state():TpermissionState {
    return {
      routes: [],
      dynamicRoutes: [],
    };
  },
  actions: {
    generateRoutes() {
      
    },
  },
});

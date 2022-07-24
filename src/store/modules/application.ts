import { getSidebarStatus, setSidebarStatus } from "@/utils/cookie";
import { defineStore } from "pinia";
import type { IAppState } from "~/store";
import store from "..";

export const useApplicationStore = defineStore({
  id: "applicationStore",
  state(): IAppState {
    return {
      sidebar: {
        opened: getSidebarStatus() !== "closed",
        withoutAnimation: false,
      },
    };
  },
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.opened
        ? setSidebarStatus("opened")
        : setSidebarStatus("closed");
    },
  },
  getters: {},
});
export function useApplicationStoreHook() {
  return useApplicationStore(store);
}

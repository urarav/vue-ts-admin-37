import { getSidebarStatus, setSidebarStatus } from "@/utils/cookie";
import { defineStore } from "pinia";
import { IappState } from "~/store";

export const useApplicationStore = defineStore({
  id: "applicationStore",
  state(): IappState {
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
});

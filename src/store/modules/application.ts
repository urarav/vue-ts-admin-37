import { defineStore } from "pinia";
import { IappState } from "~/store";

export const useApplicationStore = defineStore({
  id: "applicationStore",
  state(): IappState {
    return {
      sidebar: {
        opened: true,
        withoutAnimation: false,
      },
    };
  },
  actions: {
    toogleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
    },
  },
});

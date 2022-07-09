import { defineStore } from "pinia";
import type { loginInfo } from "~/store";

export const useUserStore = defineStore({
  id: "useStore",
  state() {
    return {};
  },
  actions: {
    login(info: loginInfo) {
      debugger
    },
  },
});

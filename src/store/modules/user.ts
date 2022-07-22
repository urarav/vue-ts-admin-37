import { defineStore } from "pinia";
import { accountLogin, userInfoRequest } from "@/api/login";
import { removeToken, setToken } from "@/utils/cookie";
import type {
  TloginInfo,
  TloginResponse,
  TuserInfoResponse,
  TuserState,
} from "~/store";
import store from "@/store";
import { resetRouter } from "@/router";

export const useUserStore = defineStore({
  id: "useStore",
  state(): TuserState {
    return {
      roles: [],
      token: "",
    };
  },
  actions: {
    async login(info: TloginInfo) {
      const res = await accountLogin<TloginResponse>(info);
      const {
        data: { accessToken },
      } = res;
      setToken(accessToken);
      return accessToken;
    },
    async getUserInfo() {
      const userInfo = await userInfoRequest<TuserInfoResponse>();
      const {
        data: {
          user: { roles },
        },
      } = userInfo;
      this.roles = roles;
      return roles;
    },
    logout() {
      this.$reset();
      removeToken();
      // location.reload();
      resetRouter();
    },
  },
});

export function useUserStoreHook() {
  return useUserStore(store);
}

import { defineStore } from "pinia";
import { accountLogin, userInfoRequest } from "@/api/login";
import { removeToken, setToken } from "@/utils/cookie";
import type {
  TLoginInfo,
  TLoginResponse,
  TUserInfoResponse,
  TUserState,
} from "~/store";
import store from "@/store";
import { resetRouter } from "@/router";

export const useUserStore = defineStore({
  id: "useStore",
  state(): TUserState {
    return {
      roles: [],
      token: "",
    };
  },
  actions: {
    async login(info: TLoginInfo) {
      const res = await accountLogin<TLoginResponse>(info);
      const { accessToken } = res;
      setToken(accessToken);
      return accessToken;
    },
    async getUserInfo() {
      const userInfo = await userInfoRequest<TUserInfoResponse>();
      const {
        user: { roles },
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
  getters: {},
});

export function useUserStoreHook() {
  return useUserStore(store);
}

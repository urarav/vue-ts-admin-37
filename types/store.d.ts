import { RouteRecordRaw } from "vue-router";

export interface IUserInfo {
  avatar?: string;
  email?: string;
  introduction?: string;
  name?: string;
  password: string;
  username: string;
  roles: Array<string>;
  [propName: string]: any;
}
export type TUserState = Pick<IuserInfo, "roles"> & { token: string };
export type TLoginInfo = Pick<IuserInfo, "username" | "password">;
export type TLoginResponse = {
  accessToken: string;
  [key: string]: any;
};
export type TUserInfoResponse = {
  user: IuserInfo;
};

export type TPermissionState = Record<string, Array<RouteRecordRaw>>;

export interface IAppState {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

export interface ISettingsStore {
  showTagsView: boolean;
  showSidebarLogo: boolean;
  fixedHeader: boolean;
  showThemeSwitch: boolean;
  showScreenplay: boolean;
}

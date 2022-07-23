import { Interface } from "readline";
import { RouteRecordRaw } from "vue-router";

export interface IuserInfo {
  avatar?: string;
  email?: string;
  introduction?: string;
  name?: string;
  password: string;
  username: string;
  roles: Array<string>;
  [propName: string]: any;
}
export type TuserState = Pick<IuserInfo, "roles"> & { token: string };
export type TloginInfo = Pick<IuserInfo, "username" | "password">;
export type TloginResponse = {
  accessToken: string;
  [key: string]: any;
};
export type TuserInfoResponse = {
  user: IuserInfo;
};

export type TpermissionState = Record<string, Array<RouteRecordRaw>>;

export interface IappState {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

export interface IsettingsStore {
  fixedHeader: boolean;
  showTagsView: boolean;
  showSidebarLogo: boolean;
  showThemeSwitch: boolean;
  showScreenfull: boolean;
}

export interface IuserInfo {
  userName: string;
  password: string;
  avatar?: string;
  roles: Array<string>;
}
export type loginInfo = Pick<IuserInfo, "userName" | "password">;

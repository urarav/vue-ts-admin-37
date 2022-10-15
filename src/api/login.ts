import request from "@/utils/request";
import type { TLoginInfo } from "~/store";

export function accountLogin<T>(data: TLoginInfo) {
  return request.post<T>("users/login", data);
}

export function userInfoRequest<T>() {
  return request.get<T>("users/info");
}

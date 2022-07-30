import request from "@/utils/request";
import type { TLoginInfo } from "~/store";
import type { RequestData } from "~/axios";

export function accountLogin<T>(data: TLoginInfo) {
  return request.post<RequestData<T>>("users/login", data);
}

export function userInfoRequest<T>() {
  return request.post<RequestData<T>>("users/info");
}

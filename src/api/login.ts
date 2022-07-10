import request from "@/utils/request";
import type { TloginInfo } from "~/store";
import type { RequestData } from "~/axios";

export function accountLogin<T>(data: TloginInfo) {
  return request.post<RequestData<T>>("users/login", data);
}

export function userInfoRequest<T>() {
  return request.post<RequestData<T>>("users/info");
}

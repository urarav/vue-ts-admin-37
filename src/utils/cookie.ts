import Cookie from "js-cookie";
import { constantKeys } from "@/enums/constantKeys";

// token
export function setToken(token: string): void {
  Cookie.set(constantKeys.token, token);
}
export function getToken(): string | undefined {
  return Cookie.get(constantKeys.token);
}
export function removeToken(): void {
  Cookie.remove(constantKeys.token);
}

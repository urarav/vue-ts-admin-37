// axios请求data格式
export interface RequestData<T = any> {
  code: number;
  message?: string;
  data: T;
}

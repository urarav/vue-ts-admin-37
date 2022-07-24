import { getToken } from "@/utils/cookie";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class Request {
  // axios实例
  private instance: AxiosInstance;
  // 配置baseURL环境变量
  private baseConfig: AxiosRequestConfig = {
    timeout: 5000,
    baseURL: import.meta.env.VITE_APP_BASE_URL,
  };

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config));
    this.setRequestInterceptors();
    this.setResponseInterceptors();
  }

  // 设置请求拦截器
  private setRequestInterceptors() {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        getToken() &&
          (config.headers!["X-Access-Token"] = getToken() as string);
        return config;
      },
      (error: any) => Promise.reject(error)
    );
  }

  // 设置响应拦截器
  private setResponseInterceptors() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const {
          data,
          data: { code },
        } = response;
        if (code === 20000) {
          return data;
        } else {
          return Promise.reject(new Error("Error..."));
        }
      },
      (error: any) => {
        let msg = "";
        const {
          response: { status = null },
        } = error;
        switch (status) {
          case 400:
            msg = "请求错误(400)";
            break;
          case 401:
            msg = "未授权请重新登陆(401)";
            break;
          case 403:
            msg = "拒绝访问(403)";
            break;
          case 404:
            msg = "请求出错(404)";
            break;
          case 408:
            msg = "请求超时(408)";
            break;
          case 500:
            msg = "服务器错误(500)";
            break;
          case 501:
            msg = "服务未实现(501)";
            break;
          case 502:
            msg = "网络错误(502)";
            break;
          case 503:
            msg = "服务不可用(503)";
            break;
          case 504:
            msg = "网络超时(504)";
            break;
          case 505:
            msg = "HTTP版本不受支持(505)";
            break;
          default:
            msg = `连接出错${status}`;
        }
        ElMessage({
          showClose: true,
          message: msg,
          type: "error",
        });
        // return new Promise(() => {});
        return Promise.reject(error);
      }
    );
  }

  // 请求方法
  // public request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  //   return this.instance.request<T>(config);
  // }
  public request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request<any, T>(config);
  }

  // GET请求
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<any, T>(url, config);
  }

  // POST请求
  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post<any, T>(url, data, config);
  }

  // PUT请求
  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.put<any, T>(url, data, config);
  }

  // DELETE请求
  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete<any, T>(url, config);
  }
}

export default new Request();

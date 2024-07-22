import axios from "axios";
import { Message } from "@arco-design/web-vue";

/**
 * 是否为开发环境
 * @returns true: 开发环境 ,false: 线上环境
 */

export const isDev = process.env.NODE_ENV === "development";

const myAxios = axios.create({
  baseURL: isDev
    ? "http://localhost:8101"
    : "https://lvedada-backend-115732-6-1328111660.sh.run.tcloudbase.com/",
  timeout: 60000,
  withCredentials: true,
});

// 全局请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 全局响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const { data } = response;
    if (data.code === 40100) {
      if (
        !response.request.responseURL.includes("user/get/login") &&
        !window.location.pathname.includes("user/login")
      ) {
        window.location.href = `/user/login?redirect=${window.location.href}`;
      }
    }
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default myAxios;

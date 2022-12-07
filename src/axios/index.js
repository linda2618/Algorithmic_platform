//封装 配置axios
import axios from "axios";

//创建axios实例
const instance = axios.create({
  baseURL: "http://150.158.165.9:5200",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

//请求拦截 (request拦截器)
instance.interceptors.request.use(
  (config) => {
    //对请求的配置文件做处理
    //   config.headers = config.headers || {};
    if (window.sessionStorage.getItem("token")) {
      config.headers = config.headers || {};
      config.headers.Authorization = window.sessionStorage.getItem("token");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//响应拦截 (response拦截器)
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;

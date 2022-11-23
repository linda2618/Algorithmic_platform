//封装接口api
import axios from "./index.js"; //默认导入 可以更换名称

export const loginApi = (data) => {
  return axios({ url: "login", method: "post", data });
};

export const getUserList = (data) => {
  return axios({ url: "users", method: "get", data });
};

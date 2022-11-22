//封装接口api
import axios from "./index"; //默认导入 可以更换名称

export const loginApi = (data) => {
  axios.post("login", data);
};

export const getUserList = (data) => {
  axios.get("users", data);
};

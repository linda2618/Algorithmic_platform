//封装接口api
import axios from "./index.js"; //默认导入 可以更换名称

export const loginApi = (data) => {
  return axios({ url: "login", method: "post", data });
};

export const getUserList = (data) => {
  return axios({ url: "users", method: "get", params: data });
};

//修改用户状态
export const changeUserState = (data) => {
  return axios({
    url: `users/${data.id}/state/${data.mg_state}`,
    method: "put",
  });
};

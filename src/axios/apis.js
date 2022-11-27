//封装接口api
import axios from "./index.js"; //默认导入 可以更换名称

export const loginApi = (data) => {
  return axios({ url: "login", method: "post", data });
};

//获取用户列表
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
//编辑用户的信息
export const getEditUsers = (data) => {
  return axios({ url: `users/${data}`, method: "get" });
};

// 提交 编辑修改用户信息
export const putEditUsers = (data) => {
  return axios({
    url: `users/${data.value.id}`,
    method: "put",
    params: { email: data.value.email, mobile: data.value.mobile },
  });
};

//删除单个用户
export const deleteOneUser = (data) => {
  return axios({ url: `users/${data}`, method: "delete" });
};

//获取订单（题目）列表
export const getOrderList = (data) => {};

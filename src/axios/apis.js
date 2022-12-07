//封装接口api
import axios from "./index.js"; //默认导入 可以更换名称

//注册
export const regApi = (data) => {
  return axios.post("/user/register", data);
};

//登录
export const loginApi = (data) => {
  return axios.post("/user/login", data);
};

//获取用户列表
export const getUserList = (data) => {
  return axios.get("/user/getUserList", { params: data });
};

//是否禁用--状态
export const changeUserState = (_id) => {
  return axios.post("/user/relieveUser", { _id });
};

//删除单个用户
export const deleteOneUser = (_id) => {
  return axios.post("/user/deleteUser", { _id });
};

//根据ID查询用户信息
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

////////////////////////////////题目列表接口

//获取商品（题目）列表
export const getGoodsList = (data) => {
  return axios({ url: "goods", method: "get", params: data });
};

//删除商品
export const deleteOneGood = (data) => {
  return axios({ url: `goods/${data}`, method: "delete" });
};

//根据ID查询商品
export const getGoodsListById = (data) => {
  return axios({ url: `goods/${data}`, method: "get" });
};
//编辑提交商品
export const changeGoodsState = (data) => {
  return axios({ url: `goods/${data.cat_id}`, method: "put", data });
};

//添加商品
export const AddOneGoods = (data) => {
  return axios({ url: "goods", method: "post", data });
};

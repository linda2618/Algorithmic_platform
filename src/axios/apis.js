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
//解禁
export const changeUserState1 = (_id) => {
  return axios.post("/user/relieveUser", { _id });
};
//禁用
export const changeUserState2 = (_id) => {
  return axios.post("/user/disableUser", { _id });
};

//删除单个用户
export const deleteOneUser = (_id) => {
  return axios.post("/user/deleteUser", { _id });
};

//根据ID查询用户信息
export const getEditUsers = (data) => {
  return axios({ url: `users/${data}`, method: "get" });
};

////////////////////////////////题目列表接口

//获取题目列表
export const getQuestionList = (data) => {
  return axios.get("/question/getQuestionList", { params: data });
};

//删除题目
export const deleteOneGood = (_id) => {
  return axios.post("/question/deleteQuestion", { _id });
};

//根据ID查询题目
export const getQuestionListById = (_id) => {
  return axios.post("/question/getQuestionById", { _id });
};
//编辑提交题目
export const changeQuestionState = (data) => {
  return axios.post("/question/updateQuestion", data);
};

//添加题目
export const AddOneQuestion = (data) => {
  return axios.post("/question/addQuestion", data);
};

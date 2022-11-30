import { createRouter, createWebHistory } from "vue-router";
import Index from "../pages/Index";

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("../pages/Login/index.vue"),
      },
    ],
  },
  {
    path: "/home",
    name: "home",
    redirect: "/welcome",
    component: () => import("../components/home.vue"),
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: () => import("../components/welcome.vue"),
      },
      //嵌套一级子路由
      {
        //假设数据-用户数据
        path: "userList",
        name: "userList",
        meta: {
          title: "用户列表",
          isShow: true,
        },
        component: () => import("../components/userList/index.vue"),
      },
      {
        //假设题目数据  -订单数据
        path: "goods",
        name: "goods",
        meta: {
          title: "题目列表",
          isShow: true,
        },
        component: () => import("../components/Topic/index.vue"),
      },
      {
        //修改题目页面
        path: "goods/update",
        name: "update",
        meta: {
          title: "修改题目列表",
        },
        component: () => import("../components/Topic/Update.vue"),
      },
      {
        //假设解题数据 --商品数据
        path: "order",
        name: "order",
        meta: {
          title: "发布题目列表",
          isShow: true,
        },
        component: () => import("../components/AddTopic/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//路由拦截(允许路由发生变化时，进行一些操作)
// 路由守卫 ,to 将要访问的路径， from 代表那个路径跳转而来，
router.beforeEach((to, from, next) => {
  //如果，没有登陆则只能进入登陆页面
  // const token = localStorage.getItem("token");
  // if (!token && to.path !== "/login") {
  //   return "/login";
  // }
  next();
});

export default router;

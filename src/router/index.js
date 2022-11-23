import {
  createRouter,
  createWebHistory,
  // createWebHashHistory,
} from "vue-router";
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
    component: () => import("../components/home.vue"),
    children: [
      //嵌套一级子路由
      {
        path: "userList",
        name: "userList",
        component: () => import("../components/userList/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//路由拦截(允许路由发生变化时，进行一些操作)
// 路由守卫
router.beforeEach((to, from, next) => {
  //如果，没有登陆则只能进入登陆页面
  // const token = localStorage.getItem("token");
  // if (!token && to.path !== "/login") {
  //   return "/login";
  // }
  next();
});

export default router;

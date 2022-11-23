import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import vuex from "vuex";
//引入vuex
import store from "./store";

//引入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//导入字体图标
import "./assets/font_2895448_xona8jdst7d/iconfont.css";
//导入全局样式表
import "./assets/css/global.css";

createApp(App).use(router).use(ElementPlus).use(store).mount("#app");

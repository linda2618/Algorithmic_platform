<template>
    <div class="manyCl">
        <!-- 头部区域 -->
        <Header></Header>

        <!-- 主体区域 -->
        <Main></Main>

        <!-- 底部模块 -->
        <Footer></Footer>

        <!-- 登录弹出框 -->
        <div :class="{ type: store.state.showLoginView }">
            <Login></Login>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
// 引入登录组件
import Login from '../Login/index.vue'
import Header from './Header.vue'
import Main from './Main.vue'
import Footer from './Footer.vue'

//按需引入 useStore()方法
import { useStore } from 'vuex'
// useStore()方法创建store对象，相当于src/store/index.js中的store实例对象
const store = useStore()

const router = useRouter()


// 修改showLoginView的值
const handleClick = () => {
    //触发mutation, 用于同步修改state的信息
    store.commit('changeStyle', !store.state.showLoginView)
}
</script>

<style lang="less" scoped>
.type {
    display: none;
}

.manyCl {
    background-color: rgb(247, 248, 250);

}
</style>
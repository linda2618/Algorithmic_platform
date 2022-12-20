<template>
    <!-- 头部 -->
    <div>


        <div class="h">
            <div class="el-header">
                <div class="header_left">
                    <ul>
                        <li>
                            <i class="iconfont icon-a-shujutongji20beifen2"></i>
                        </li>
                        <li>
                            <a href="#">学习</a>
                        </li>
                        <li>
                            <a href="#">题库</a>
                        </li>
                        <li>
                            <a href="#">讨论</a>
                        </li>
                        <li>
                            <a href="#">收藏</a>
                        </li>
                        <li>
                            <a href="#">竞赛</a>
                        </li>
                        <li>
                            <a href="#" class="aLast">
                                <i class="iconfont icon-gouwuche"></i>
                                <select class="selectStyle">
                                    <option value="商店">商店</option>
                                    <option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </select>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="header_right">
                    <ul>
                        <li><a href="#" @click="handleClick">登录/注册</a></li>
                        <li>
                            <el-avatar class="iconfont icon-ziyuanxhdpi" :size="large" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 登录弹出框 -->
        <div :class="{ type: store.state.showLoginView }">
            <Login></Login>
        </div>


    </div>

</template>

<script setup>
import '@/assets/css/Index/header.less'

// 引入登录组件
import Login from '../Login/index.vue'
//按需引入 useStore()方法
import { useStore } from 'vuex'
// useStore()方法创建store对象，相当于src/store/index.js中的store实例对象
const store = useStore()

// 修改showLoginView的值
const handleClick = () => {
    //触发mutation, 用于同步修改state的信息
    store.commit('changeStyle', !store.state.showLoginView)
}

const options = [
    {
        value: '精品商城',
        label: '精品商城',
    },
    {
        value: '每日周边',
        label: '每日周边',
    },
    {
        value: 'VIP会员',
        label: 'VIP会员',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
]
</script>

<style lang="less" scoped>
.type {
    display: none;
}
</style>
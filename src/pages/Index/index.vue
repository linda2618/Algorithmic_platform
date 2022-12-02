<template>
    <div>
        <div>
            <!-- 头部 -->
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
                    </ul>
                </div>
                <div class="header_right">
                    <ul>
                        <li><a href="#" @click="handleClick">登录</a></li>
                        <li><span>或</span></li>
                        <li><a href="#" @click="handleClick">注册</a></li>
                        <li>
                            <el-avatar class="iconfont icon-ziyuanxhdpi" :size="large" />
                        </li>
                    </ul>
                </div>
                <!-- <div class="header_right1">
                    <ul>
                        <li><a href="#" @click="handleClick">登录</a></li>
                        <li><span>或</span></li>
                        <li><a href="#" @click="handleClick">注册</a></li>
                        <li>
                            <el-avatar class="iconfont icon-ziyuanxhdpi" :size="large" />
                        </li>
                    </ul>
                </div> -->
            </div>

            <!-- 主体区域 -->
            <Main></Main>

            <!-- 底部模块 -->
            <Footer></Footer>
            <!-- 登录弹出框 -->
            <div :class="{ type: store.state.showLoginView }">
                <Login></Login>
            </div>

        </div>
    </div>


</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
// 引入登录组件
import Login from '../Login/index.vue'
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


.el-header {
    width: 1500px;
    margin: 0 auto;
    font-size: 18px;
    height: 60px;
    line-height: 30px;
    background-color: #fff;

    .header_left {
        float: left;

        .icon-a-shujutongji20beifen2:before {
            font-size: 50px;
        }
    }

    .header_right {
        float: right;
        margin-right: 10px;

        .el-avatar {
            margin-top: -6px;
            --el-avatar-size: 42px;

        }

        .iconfont {
            font-size: 32px;
        }

        // .header_right ul li:last-child {
        //     line-height: 20px;
        // }
    }



    ul>li {
        list-style: none;
        float: left;
        font-style: 16px;
        margin-right: 25px;

        a {
            color: #000;
            text-decoration: none;
        }
    }
}
</style>
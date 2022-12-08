<template>
    <el-container class="home-contain">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../assets/title.png" alt="">
                <span>算法在线管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>

            <!-- 侧边栏 -->
            <el-aside width="200px">
                <el-menu active-text-color="#409EFF" background-color="#545c64" class="el-menu-vertical-demo"
                    :default-active="active" text-color="#fff" unique-opened router>
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <i class="iconfont icon-yonghuming1"></i>
                            </el-icon>
                            <span>
                                用户管理
                            </span>
                        </template>
                        <el-menu-item :index="list[0].path">
                            <el-icon>
                                <Menu />
                            </el-icon>
                            用户列表
                        </el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                                <i class="iconfont icon-kaoshi"></i>
                            </el-icon>
                            <span>
                                题目管理
                            </span>
                        </template>
                        <el-menu-item :index="list[1].path">
                            <el-icon>
                                <Menu />
                            </el-icon>
                            题目列表
                        </el-menu-item>
                        <el-menu-item :index="list[2].path">
                            <el-icon>
                                <Menu />
                            </el-icon>
                            发布题目
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-aside>

            <!-- 主体区域 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
                <!-- 这是路由标签 -->
                <!-- <router-link to="./userList/index.vue"></router-link> -->
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
//导入icon图标
import { Menu } from "@element-plus/icons-vue";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const active = route.path
// console.log(active);

//方法能获取到静态和动态的所有路由
const list = router.getRoutes().filter(v => v.meta.isShow)

const logout = () => {
    window.sessionStorage.clear()
    router.push('/')
}

//保存链接的激活状态
// saveNavStatus(activePath) {
//     window.sessionStorage.setItem("activePath", activePath);
//     this.activePath = activePath;
// }

</script>

<style lang="less" scoped>
.home-contain {
    height: 100%;
}

.home_container {
    height: 100%;
}

.el-header {
    display: flex;
    justify-content: space-between;
    color: #fff;
    // text-align: center;
    padding-left: 0;
    font-size: 20px;
    background-color: #4c5054;

    .el-button {
        margin-top: 14px;
    }

    div {
        display: flex;
        align-items: center;

        img {
            height: 100%;
        }
    }
}

.el-aside {
    background-color: rgba(84, 92, 100);

    .el-menu {
        border-right: none;
    }
}

.el-main {
    background-color: #eaedf1;
}
</style>
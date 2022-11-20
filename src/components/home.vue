<template>
    <el-container>
        <el-header>
            <div>
                <img src="../assets/title.png" alt="">
                <span>算法在线管理系统</span>
            </div>
            <el-button type="info">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                    default-active="2" text-color="#fff">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <i class="iconfont icon-yonghuming1"></i>
                            </el-icon>
                            <span>
                                用户管理
                            </span>
                        </template>
                        <el-menu-item index="1-1">
                            <el-icon>
                                <Menu />
                            </el-icon>
                            用户列表
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <el-icon>
                                <Menu />
                            </el-icon>被封禁用户列表
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
                        <el-menu-item index="2-1">
                            <el-icon>
                                <Menu />
                            </el-icon>题目列表
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { reactive } from 'vue'
//导入icon图标
import { Menu } from "@element-plus/icons-vue";


</script>

<style lang="less" scoped>
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
    background-color: #898a8b;
}

.el-main {
    background-color: #eaedf1;
}
</style>
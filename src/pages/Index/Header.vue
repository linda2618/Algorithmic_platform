<template>
    <!-- 头部 -->
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
</template>

<script setup>
import '@/assets/css/Index/header.less'
</script>

<style lang="less" scoped>

</style>
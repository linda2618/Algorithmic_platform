<template>
    <div class="manyCl">
        <!-- 头部区域 -->
        <Header></Header>

        <!-- 主体区域 -->
        <Main></Main>

        <!-- 底部模块 -->
        <Footer></Footer>


    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Header from './Header.vue'
import Main from './Main.vue'
import Footer from './Footer.vue'



const router = useRouter()


</script>

<style lang="less" scoped>
.manyCl {
    background-color: rgb(247, 248, 250);

}
</style>
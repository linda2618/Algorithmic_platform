<template>
    <!-- 商品列表代替 -->
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>题目管理</el-breadcrumb-item>
            <el-breadcrumb-item>题目列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="true" :model="topicData" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="topicData.title" placeholder="请输入关键字" />
            </el-form-item>
            <el-form-item label="详情">
                <el-input v-model="topicData.body" placeholder="请输入关键字" />

            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list[topicData.page]" stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="title" label="标题" width="180" />
            <el-table-column prop="body" label="详情" />
        </el-table>
        <el-pagination @current-change="currentChange" background layout="prev, pager, next" :total="topicData.count" />

    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
onMounted(() => {

})

</script>

<style lang="less" scoped>

</style>
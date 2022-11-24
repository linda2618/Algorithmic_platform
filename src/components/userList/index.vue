<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <!-- 搜索区域 -->
            <template #header>
                <div class="card-header">
                    <el-row :gutter="25">
                        <el-col :span="9">
                            <el-input v-model="input" placeholder="请输入内容" clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="primary" :icon="Search">查询</el-button>
                        </el-col>
                    </el-row>
                </div>
            </template>

            <!-- 用户列表区域 -->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="username" label="姓名" width="360" />
                <el-table-column prop="role_name" label="题目" width="360" />
                <el-table-column prop="address" label="关注" width="360" />
                <el-table-column prop="role" label="操作" width="360" />
            </el-table>
        </el-card>



    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>

</style>
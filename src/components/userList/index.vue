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
                            <el-input placeholder="请输入内容" clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="primary">查询</el-button>
                        </el-col>
                    </el-row>
                </div>
            </template>

            <!-- 用户列表区域 -->
            <el-table :data="usersData" border style="width: 100%">
                <el-table-column type="index" label="id" />
                <el-table-column prop="username" label="用户名" />
                <el-table-column prop="mobile" label="电话" />
                <el-table-column prop="role_name" label="角色" />
                <el-table-column prop="email" label="邮箱" />
                <el-table-column label="状态" prop="mg_state">
                    <!-- 用插槽包裹el-switch开关 -->
                    <template v-slot="scope">
                        <span>封禁</span>
                        <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)" />
                        <span>启用</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" class="iconfont icon-zuoti" circle
                            @click="showEditDialog(scope.row.id)" size="large">
                        </el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" class="iconfont icon-shanchu2" circle
                            @click="removeUserById(scope.row.id)" size="large">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>



    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getUserList, changeUserState } from '@/axios/apis'

import { ElMessage } from 'element-plus'
const queryInfo = reactive({
    query: "",
    pagenum: 1,
    pagesize: 10,
})

const usersData = ref([])
const total = ref(0)

onMounted(async () => {
    const res = await getUserList(queryInfo)

    if (res.meta.status !== 200) {
        return ElMessage.error('获取用户列表失败')
    }
    // console.log(res);
    usersData.value = res.data.users
})

// 监听 switch 开头状态的改变
const userStateChanged = async (userInfo) => {
    const res = await changeUserState(userInfo)
    console.log(res);
    if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return ElMessage.error('更新用户状态失败')
    }
    ElMessage({
        message: '更新用户状态成功',
        type: 'success',
    })
}

//修改按钮
const showEditDialog = () => {

}

</script>

<style lang="less" scoped>

</style>
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
                            <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserListView">
                            </el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="primary" @click="getUserListView">查询</el-button>
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
            <!-- 分页区域 -->
            <el-pagination v-model:current-page="queryInfo.pagenum" v-model:page-size="queryInfo.pagesize"
                :page-sizes="[3, 5, 10]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>

        <!-- 修改用户的对话框 -->
        <el-dialog title="修改用户" v-model="editDialogVisible" width="40%">
            <el-form ref="editFromRef" :label-position="labelPosition" label-width="100px" :model="editForm"
                :rules="editFormRules" style="max-width: 460px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editForm.username" disabled />
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="editForm.mobile" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="editUserInfo"> 确定 </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import {
    getUserList,
    changeUserState,
    getEditUsers,
    // putEditUsers,
    deleteOneUser,
} from "@/axios/apis";
import instance from "@/axios/index";
import { ElMessage, ElMessageBox } from "element-plus";
const queryInfo = reactive({
    query: "",
    pagenum: 1,
    pagesize: 3,
});

const usersData = ref([]);
const total = ref(0);
//查询到的用户信息对象
const editForm = ref({});
const labelPosition = ref("left");
const editFromRef = ref();
//修改用户对话框的显示与隐藏
const editDialogVisible = ref(false);

//验证邮箱的规则
var checkEmail = (rule, value, cb) => {
    //验证邮箱的正则表达式
    const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (regEmail.test(value)) {
        return cb();
    }
    cb(new Error("请输入合法的邮箱!"));
};

//验证电话的规则
var checkMobile = (rule, value, cb) => {
    //验证电话的正则表达式
    let regMobile =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (regMobile.test(value)) {
        cb();
    } else {
        cb(new Error("手机号码格式不正确"));
    }
};

//修改表单的验证规则对象
const editFormRules = reactive({
    email: [
        { required: true, message: "请输入邮箱号", trigger: "blur" },
        { validator: checkEmail, trigger: "blur" },
    ],
    mobile: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        { validator: checkMobile, trigger: "blur" },
    ],
});

onMounted(() => {
    getUserListView();
});

const getUserListView = async () => {
    const res = await getUserList(queryInfo);

    if (res.meta.status !== 200) {
        return ElMessage.error("获取用户列表失败");
    }
    // console.log(res);
    usersData.value = res.data.users;
    total.value = res.data.total;
};

// 监听 pagesize 改变的事件
const handleSizeChange = (newSize) => {
    queryInfo.pagesize = newSize;
    getUserListView();
};

// 监听页码值 改变的事件
const handleCurrentChange = (newPage) => {
    queryInfo.pagenum = newPage;
    getUserListView();
};
// 监听 switch 开头状态的改变
const userStateChanged = async (userInfo) => {
    const res = await changeUserState(userInfo);
    // console.log(res);
    if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state;
        return ElMessage.error("更新用户状态失败");
    }
    ElMessage({
        message: "更新用户状态成功",
        type: "success",
    });
};

//修改按钮
const showEditDialog = async (id) => {
    //展示编辑用户的对话框
    const res = await getEditUsers(id);
    if (res.meta.status !== 200) {
        return ElMessage.error("查询用户信息失败");
    }
    editForm.value = res.data;
    editDialogVisible.value = true;
};

//监听修改用户对话框的关闭事件
// const editDialogClose = () => {
//     editFromRef.value.resetFields();
// }

//点击按钮，提交修改的信息
const editUserInfo = () => {
    editFromRef.value.validate(async (valid) => {
        if (!valid) return;
        // console.log(editForm.value.id); //500
        // console.log(editForm.value);
        // **********不太理解的地方
        // const res = await putEditUsers(editForm)
        const res = await instance.put("users/" + editForm.value.id, {
            email: editForm.value.email,
            mobile: editForm.value.mobile,
        });
        // console.log(res);
        if (res.meta.status !== 200) {
            return ElMessage.error("修改用户信息失败");
        }
        editDialogVisible.value = false;
        //重新获取用户列表
        getUserListView();
        ElMessage({
            message: "修改用户成功!",
            type: "success",
        });
    });
};

//删除按钮,根据id 删除对应用户信息
const removeUserById = async (id) => {
    //弹框询问用户是否删除数据
    const confirmRes = await ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    }).catch((err) => err)

    //如果用户 确认 删除,则返回值为 字符串 confirm
    //如果用户 取消了删除,则返回值为 字符串 cancel
    // console.log(confirmRes);
    if (confirmRes !== "confirm") {
        return ElMessage.error("已取消删除");
    }
    const res = await deleteOneUser(id)
    // console.log(res);
    if (res.meta.status !== 200) {
        return ElMessage.error("删除用户失败");
    }
    ElMessage({
        type: "success",
        message: "删除用户成功",
    });
    getUserListView();
};
</script>

<style lang="less" scoped>

</style>

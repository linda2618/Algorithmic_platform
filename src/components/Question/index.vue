<template>
    <!-- 商品列表代替 -->
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>题目管理</el-breadcrumb-item>
            <el-breadcrumb-item>题目列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>

            <!-- 搜索区域
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
            </template> -->

            <el-tag class="header-title" size="large" type="success">题目列表</el-tag>
            <el-table :data="questionList" stripe border style="width: 100%">
                <el-table-column type="index" />
                <el-table-column prop="title" label="题目" width="260" />
                <el-table-column prop="description" label="题目描述(简述)" width="540" />
                <el-table-column prop="degree" label="难度等级" width="110">
                    <template v-slot="scope">
                        <el-tag type="primary" v-if="scope.row.degree === '简单'">简单</el-tag>
                        <el-tag type="danger" v-if="scope.row.degree === '困难'">困难</el-tag>
                        <el-tag type="success" v-else-if="scope.row.degree === '中等'">中等</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="submit" label="提交次数" width="110" />
                <el-table-column prop="pass" label="通过次数" width="110" />
                <el-table-column label="状态" prop="state" width="110">
                    <template v-slot="scope">
                        <el-tag type="success" v-if="scope.row.state === true">已发布</el-tag>
                        <el-tag type="" v-else>待发布</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="add_time" label="添加时间" />
                <el-table-column prop="upd_time" label="更新时间" />
                <el-table-column label="操作" width="150">
                    <template v-slot="scope">
                        <!-- 修改按钮 -->
                        <el-tooltip class="item" effect="dark" content="展开/修改题目" placement="top" :enterable="false">
                            <el-button type="primary" class="iconfont icon-zuoti" circle
                                @click="goUpdatePage(scope.row._id)" size="large">
                            </el-button>
                        </el-tooltip>
                        <!-- 删除按钮 -->
                        <el-button type="danger" class="iconfont icon-shanchu2" circle
                            @click="removeQuestionById(scope.row._id)" size="large">
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @current-change="handleCurrentChange" :current-page="queryInfo.page"
                :page-sizes="[5, 10, 15]" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from 'vue-router'
import { getQuestionList, deleteOneGood } from "@/axios/apis.js";
import { ElMessage, ElMessageBox } from "element-plus";
const router = useRouter()

const queryInfo = reactive({
    page: 1,
});

const questionList = ref([]);
const selectList = ref([]);
const dataList = ref([]);
const total = ref(0);

onMounted(() => {
    getQuestionListView()
});

//获取商品列表
const getQuestionListView = async () => {
    const res = await getQuestionList(queryInfo);
    // console.log(res);
    if (res.status === 200) {
        questionList.value = res.data;
        total.value = res.total;
    }
};


//分页功能
const handleCurrentChange = (newPage) => {
    queryInfo.page = newPage;
    getQuestionListView();
};

//跳转后 修改题目详情
const goUpdatePage = (id) => {
    // console.log(id);
    router.push({ path: "/home/question/update", query: { _id: id } })
}


//删除商品
const removeQuestionById = async (_id) => {
    const confirmRes = await ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    }).catch((err) => err)

    if (confirmRes !== "confirm") {
        return ElMessage.error("已取消删除");
    }
    const res = await deleteOneGood(_id)
    // console.log(res);
    if (res.status !== 200) {
        return ElMessage.error("删除用户失败");
    }
    ElMessage({
        type: "success",
        message: res.message,
    });
    getQuestionListView();
}

</script>

<style lang="less" scoped>
.header-title {
    font-size: 18px;
    margin-bottom: 20px;
}

.el-breadcrumb {
    font-size: 20px;
    margin-bottom: 30px;
}

.el-table {
    font-size: 20px;

    :deep(.cell) {
        height: 92px;
    }
}

// .description {
//     // height: 120px;
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
// }
</style>

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
            <!-- <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsListView">
                        <el-button icon="el-icon-search" @click="getGoodsListView"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="goUpdatePage">添加商品</el-button>
                </el-col>
            </el-row> -->

            <el-tag class="ml-2" size="large" type="success">题目列表</el-tag>
            <el-table :data="goodsList" stripe border style="width: 100%">
                <el-table-column type="index" />
                <el-table-column prop="goods_name" label="商品名称" width="640" />
                <el-table-column prop="goods_price" label="价格" width="120" />
                <el-table-column prop="goods_number" label="数量" width="120" />
                <el-table-column label="是否付款" prop="goods_state" width="120">
                    <template v-slot="scope">
                        <el-tag type="danger" v-if="scope.row.pay_status === '0'">未通过</el-tag>
                        <el-tag type="success" v-if="scope.row.pay_status === '2'">已审核</el-tag>
                        <el-tag type="" v-else>审核中</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="add_time" label="添加时间" />
                <el-table-column prop="upd_time" label="更新时间" />
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <!-- 修改按钮 -->
                        <el-tooltip class="item" effect="dark" content="跳转修改题目" placement="top" :enterable="false">
                            <el-button type="primary" class="iconfont icon-zuoti" circle
                                @click="goUpdatePage(scope.row.goods_id)" size="large">
                            </el-button>
                        </el-tooltip>
                        <!-- 删除按钮 -->
                        <el-button type="danger" class="iconfont icon-shanchu2" circle
                            @click="removeGoodsById(scope.row.goods_id)" size="large">
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from 'vue-router'
import { getGoodsList, deleteOneGood } from "@/axios/apis.js";
import { ElMessage, ElMessageBox } from "element-plus";
const router = useRouter()

const queryInfo = reactive({
    query: "",
    pagenum: 1,
    pagesize: 10,
});

const goodsList = ref([]);
const selectList = ref([]);
const dataList = ref([]);
const total = ref(0);

onMounted(() => {
    getGoodsListView();
});

//获取商品列表
const getGoodsListView = async () => {
    const res = await getGoodsList(queryInfo);
    // console.log(res);
    if (res.meta.status !== 200) {
        return ElMessage.error("获取订单列表失败！");
    }

    goodsList.value = res.data.goods;
    total.value = res.data.total;
};

//查询按钮
// const onSubmit = () => {
//     let arr = ref([])

//     if (selectList.value.goods_number) {
//         arr = dataList.value.filter(v => v.goods_number.indexOf(selectList.value.goods_number) != -1)
//     }
//     if (selectList.value.pay_status) {
//         arr = (selectList.value.pay_status ? arr : dataList.value).filter(v => v.pay_status.indexOf(selectList.value.pay_status) != -1)

//     }
//     else {
//         arr = dataList.value
//     }
//     goodsList.value = []
//     goodsList.value.push(arr)

// }
// }

// 分页
const handleSizeChange = (newSize) => {
    queryInfo.pagesize = newSize;
    getGoodsListView();
};
const handleCurrentChange = (newPage) => {
    queryInfo.pagenum = newPage;
    getGoodsListView();
};

//跳转后 修改题目详情
const goUpdatePage = (id) => {
    router.push({ path: "goods/update", query: { goods_id: id } })
}


//删除商品
const removeGoodsById = async (id) => {


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
    const res = await deleteOneGood(id)
    // console.log(res);
    if (res.meta.status !== 200) {
        return ElMessage.error("删除用户失败");
    }
    ElMessage({
        type: "success",
        message: "删除用户成功",
    });
    getGoodsListView();
}
</script>

<style lang="less" scoped>

</style>

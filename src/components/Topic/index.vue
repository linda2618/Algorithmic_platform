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
            <el-row>
                <!-- <el-col :span="9">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="订单编号">
                        <el-input v-model="queryInfo.query" placeholder="请输入关键字" clearable @clear="getOrderListView" />
            </el-col>
            </el-form-item>
            <el-form-item label="是否支付">
                <el-input v-model="selectList.pay_status" placeholder="请输入关键字" />
            </el-form-item>
            </el-form>
            <el-col :span="4">
                <el-button type="primary" @click="getOrderListView">查询</el-button>
            </el-col> -->

                <el-tag class="ml-2" size="large" type="success">题目列表</el-tag>
                <el-table :data="orderList" stripe border style="width: 100%">
                    <el-table-column type="index" />
                    <el-table-column prop="order_number" label="标题" />
                    <el-table-column prop="order_price" label="订单价格" />
                    <el-table-column label="是否付款" prop="pay_status">
                        <template v-slot="scope">
                            <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
                            <el-tag type="danger" v-else>未付款</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="创建时间" />
                    <el-table-column label="操作">
                        <template v-slot="scope">
                            <!-- 修改按钮 -->
                            <el-tooltip class="item" effect="dark" content="跳转修改题目" placement="top" :enterable="false">
                                <el-button type="primary" class="iconfont icon-zuoti" circle
                                    @click="showEditDialog(scope.row.id)" size="large">
                                </el-button>
                            </el-tooltip>
                            <!-- 删除按钮 -->
                            <!-- <el-tooltip class="item" effect="dark" content="删除题目" placement="top" :enterable="false"> -->
                            <el-button type="danger" class="iconfont icon-shanchu2" circle
                                @click="removeUserById(scope.row.id)" size="large">
                            </el-button>
                            <!-- </el-tooltip> -->
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页区域 -->
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15]" :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </el-row>
        </el-card>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { getOrderList } from "@/axios/apis.js";

const queryInfo = reactive({
    query: "",
    pagenum: 1,
    pagesize: 10,
});

const orderList = ref([]);
const selectList = ref([]);
const dataList = ref([]);
const total = ref(0);

onMounted(() => {
    getOrderListView();
});

const getOrderListView = async () => {
    const res = await getOrderList(queryInfo);
    // console.log(res);
    if (res.meta.status !== 200) {
        return ElMessage.error("获取订单列表失败！");
    }

    orderList.value = res.data.goods;
    total.value = res.data.total;

    // renderOrderList(res.data.goods)
    // dataList.value = res.data.goods
};

//查询按钮
// const onSubmit = () => {
//     let arr = ref([])

//     if (selectList.value.order_number) {
//         arr = dataList.value.filter(v => v.order_number.indexOf(selectList.value.order_number) != -1)
//     }
//     if (selectList.value.pay_status) {
//         arr = (selectList.value.pay_status ? arr : dataList.value).filter(v => v.pay_status.indexOf(selectList.value.pay_status) != -1)

//     }
//     else {
//         arr = dataList.value
//     }
//     orderList.value = []
//     orderList.value.push(arr)

// }
// }

// 分页
const handleSizeChange = (newSize) => {
    queryInfo.pagesize = newSize;
    getOrderListView();
};
const handleCurrentChange = (newPage) => {
    queryInfo.pagenum = newPage;
    getOrderListView();
};
</script>

<style lang="less" scoped>

</style>

<template>
    <div>
        <el-card>
            <el-form ref="TopicDetailRef" :label-position="labelPosition" label-width="100px" :model="TopicDetail"
                :rules="TopicDetailRules" style="max-width: 800px" :size="size">
                <el-form-item label="商品名称" prop="goods_name">
                    <el-input v-model="TopicDetail.goods_name" type="textarea" />
                </el-form-item>
                <el-form-item label="价格" prop="goods_price">
                    <el-input v-model="TopicDetail.goods_price" />
                </el-form-item>
                <el-form-item label="数量" prop="goods_number">
                    <el-input v-model="TopicDetail.goods_number" />
                </el-form-item>
                <el-form-item label="重量" prop="goods_weight">
                    <el-input v-model="TopicDetail.goods_weight" />
                </el-form-item>
                <el-form-item label="添加时间" prop="add_time">
                    <el-input v-model="TopicDetail.add_time" disabled />
                </el-form-item>
                <el-form-item label="更新时间" prop="upd_time">
                    <el-input v-model="TopicDetail.upd_time" disabled />
                </el-form-item>
                <el-form-item label="是否是热销品" prop="is_promote">
                    <el-tag class="ml-2" v-if="TopicDetail.is_promote === 'true'" type="success" size="large"> 是
                    </el-tag>
                    <el-tag class="ml-2" v-else type="danger" size="large"> 否 </el-tag>
                </el-form-item>
                <el-form-item label="详情图片" prop="is_promote">
                    <div class="demo-image__placeholder">
                        <div class="block">
                            <el-image :src="src" class="imgSrc">
                                <template #placeholder>
                                    <div class="image-slot">Loading<span class="dot">...</span></div>
                                </template>
                            </el-image>
                        </div>
                    </div>

                </el-form-item>
            </el-form>
            <el-button type="primary" @click="editInfo" size="large"> 确定 </el-button>
            <el-button type="info" @click="resetForm(TopicDetailRef)" size="large">取消</el-button>

        </el-card>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getGoodsListById, changeGoodsState } from '@/axios/apis.js'
import { ElMessage, ElMessageBox } from "element-plus";

const route = useRoute()

//接收跳转携带过来的参数Id
let Id = route.query.goods_id;

const TopicDetail = ref({})
const TopicDetailRef = ref()
const src =
    'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'

var checkPrice = (rule, value, cb) => {
    //验证价格的正则表达式
    let regPrice = /^[1-9]\d*|0$/
    if (regPrice.test(value)) {
        cb();
    } else {
        cb(new Error("价格是不小于0的整数"));
    }
}

var checkNumber = (rule, value, cb) => {
    //验证价格的正则表达式
    let regNumber = /^[1-9]\d*|0$/
    if (regNumber.test(value)) {
        cb();
    } else {
        cb(new Error("数量是不小于0的整数"));
    }
}
var checkWeight = (rule, value, cb) => {
    //验证价格的正则表达式
    let regWeight = /^[1-9]\d*|0$/
    if (regWeight.test(value)) {
        cb();
    } else {
        cb(new Error("重量是不小于0的整数"));
    }
}
const TopicDetailRules = reactive({
    goods_price: [
        { required: true, message: "请输入价格", trigger: "blur" },
        { validator: checkPrice, trigger: "blur" },
    ],
    goods_number: [
        { required: true, message: "请输入数量", trigger: "blur" },
        { validator: checkNumber, trigger: "blur" },

    ],
    goods_weight: [
        { required: true, message: "请输入重量", trigger: "blur" },
        { validator: checkWeight, trigger: "blur" },
    ],
});

const labelPosition = ref('left')
const size = ref('large')


onMounted(() => {
    getGoodsListByIdView()
})

const getGoodsListByIdView = async () => {
    const res = await getGoodsListById(Id)
    console.log(res);
    if (res.meta.status !== 200) {
        return ElMessage.error("获取此题目数据失败");
    }
    TopicDetail.value = res.data
}

//取消按钮
const resetForm = () => {
    // TopicDetailRef.value.resetFields()
    getGoodsListByIdView()
}

//确定按钮
const editInfo = async () => {
    console.log(TopicDetail.value);
    const res = await changeGoodsState(TopicDetail.value)
    console.log(res);
}


</script>

<style  lang="less" scoped>
.imgSrc {
    width: 300px;
}
</style>
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
                <el-form-item label="商品猫" prop="goods_cat">
                    <el-input v-model="TopicDetail.goods_cat" />
                </el-form-item>
                <el-form-item label="数量" prop="goods_number">
                    <el-input v-model="TopicDetail.goods_number" />
                </el-form-item>
                <el-form-item label="重量" prop="goods_weight">
                    <el-input v-model="TopicDetail.goods_weight" />
                </el-form-item>
                <el-form-item label="介绍" prop="goods_introduce">
                    <el-input v-model="TopicDetail.goods_introduce" />
                </el-form-item>
                <el-form-item label="添加时间" prop="add_time">
                    <el-input v-model="TopicDetail.add_time" disabled />
                </el-form-item>
                <el-form-item label="更新时间" prop="upd_time">
                    <el-input v-model="TopicDetail.upd_time" disabled />
                </el-form-item>
                <el-form-item label="是否是热销品" prop="is_promote">
                    <el-tag class="ml-2" v-if="TopicDetail.is_promote === true" type="success" size="large"> 是
                    </el-tag>
                    <el-tag class="ml-2" v-if="TopicDetail.is_promote === false" type="danger" size="large"> 否
                    </el-tag>
                    <el-tag class="ml-2" v-else type="danger" size="large">
                        <el-input v-model="TopicDetail.is_promote" size="small" />
                    </el-tag>
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
            <el-button type="primary" @click="AddGoods" size="large"> 确定 </el-button>
            <el-button type="info" @click="resetForm" size="large">取消</el-button>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { AddOneGoods } from '@/axios/apis.js'
import { ElMessage } from "element-plus";



const TopicDetail = ref({})
const TopicDetailRef = ref()
const src = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
var checkName = (rule, value, cb) => {
    //验证价格的正则表达式
    let regName = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
    if (regName.test(value)) {
        cb();
    } else {
        cb(new Error("价格是不小于0的整数"));
    }
}

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
    goods_name: [
        { required: true, message: "请输入价格", trigger: "blur" },
        { validator: checkName, trigger: "blur" },
    ],
    goods_price: [
        { required: true, message: "请输入价格", trigger: "blur" },
        { validator: checkPrice, trigger: "blur" },
    ],
    goods_cat: [
        { required: true, message: "请输入商品猫", trigger: "blur" },
        { type: 'string', message: "商品猫为以,分隔的字符串", trigger: "blur" },

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

//取消按钮
const resetForm = () => {
    TopicDetailRef.value.resetFields()
}

//确定按钮
const AddGoods = async () => {
    console.log(TopicDetail.value);
    const res = await AddOneGoods(TopicDetail.value)
    console.log(res);
    //。。。。。。。。。。。。。。。。。。。。。。。。。
}


</script>

<style  lang="less" scoped>
.imgSrc {
    width: 300px;
}

// .demo-image__placeholder .el-image {
//     padding: 0 5px;
//     max-width: 300px;
//     max-height: 200px;
// }

// .demo-image__placeholder.image-slot {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 100%;
//     background: var(--el-fill-color-light);
//     color: var(--el-text-color-secondary);
//     font-size: 14px;
// }

// .demo-image__placeholder .dot {
//     animation: dot 2s infinite steps(3, start);
//     overflow: hidden;
// }
</style>
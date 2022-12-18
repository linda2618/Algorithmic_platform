<template>
    <div>
        <el-card>
            <el-tag class="header-title" size="large" type="primary">修改题目详情</el-tag>
            <el-button type="info" class="goBack" plain @click="goBack">返回上一级</el-button>
            <el-form ref="QuestionDetailRef" :label-position="labelPosition" label-width="100px" :model="QuestionDetail"
                :rules="QuestionDetailRules" style="max-width: 800px" :size="size">
                <el-form-item prop="title" label="题目">
                    <el-input v-model="QuestionDetail.title" type="textarea" :rows="10" clearable />
                </el-form-item>
                <el-form-item prop="description" label="题目描述">
                    <el-input v-model="QuestionDetail.description" type="textarea" :rows="18" clearable />
                </el-form-item>
                <el-form-item prop="degree" label="难度等级">
                    <el-input v-model="QuestionDetail.degree" clearable />
                </el-form-item>
                <el-form-item prop="submit" label="提交次数">
                    <el-input v-model="QuestionDetail.submit" disabled />
                </el-form-item>
                <el-form-item prop="pass" label="通过次数">
                    <el-input v-model="QuestionDetail.pass" disabled />
                </el-form-item>
                <!-- <el-form-item label="添加时间" prop="add_time">
                    <el-input v-model="TopicDetail.add_time" disabled />
                </el-form-item>
                <el-form-item label="更新时间" prop="upd_time">
                    <el-input v-model="TopicDetail.upd_time" disabled />
                </el-form-item> -->
                <el-form-item label="状态" prop="state">
                    <el-tag class="ml-2" v-if="QuestionDetail.state === true" type="success" size="large"> 已发布
                    </el-tag>
                    <el-tag class="ml-2" v-if="QuestionDetail.state === false" type="" size="large"> 待发布
                    </el-tag>
                </el-form-item>
                <el-form-item label="详情图片" prop="is_promote">

                    <!-- action 表示图片要上传到后台API 地址 -->
                    <!-- <el-upload class="avatar-uploader"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload> -->
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="editInfo" size="large"> 确定 </el-button>
            <el-button type="info" @click="resetForm(QuestionDetailRef)" size="large">取消</el-button>

        </el-card>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getQuestionListById, changeQuestionState } from '@/axios/apis.js'
import { ElMessage } from "element-plus";

import { Plus } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
//接收跳转携带过来的参数Id
let _id = route.query._id;

// //上传图片
// const imageUrl = ref('')
// // const uploadUrl = ref(baseurl + '/api/common/upload')
// const beforeAvatarUpload = (rawFile) => {
//     if (rawFile.type !== 'image/jpeg') {
//         ElMessage.error('图片必须是JPG格式!')
//         return false
//     } else if (rawFile.size / 1024 / 1024 > 2) {
//         ElMessage.error('图片大小不能超过2MB!')
//         return false
//     }
//     return true
// }
const handleAvatarSuccess = (res) => {

}

const QuestionDetail = ref({})
const QuestionDetailRef = ref()

const QuestionDetailRules = reactive({
    title: [
        { required: true, message: "请输入题目", trigger: "blur" },
    ],
    description: [
        { required: true, message: "请输入描述", trigger: "blur" },
    ],
    degree: [
        { required: true, message: "请输入难度", trigger: "blur" },
    ],
});

const labelPosition = ref('left')
const size = ref('large')


onMounted(() => {
    getQuestionListByIdView()
})


const getQuestionListByIdView = async () => {
    const res = await getQuestionListById(_id)
    // console.log(res);
    if (res.status !== 200) {
        return ElMessage.error("获取此题目数据失败");
    }
    QuestionDetail.value = res.data
}

//取消按钮
const resetForm = () => {
    // QuestionDetailRef.value.resetFields()
    getQuestionListByIdView()
}

//确定按钮
const editInfo = async () => {
    // console.log(QuestionDetail.value);
    const res = await changeQuestionState(QuestionDetail.value)
    // console.log(res);
    ElMessage.success(res.message);
}
const goBack = () => {
    router.back()
}


///////////////////////////////
// var checkPrice = (rule, value, cb) => {
//     //验证价格的正则表达式
//     let regPrice = /^[1-9]\d*|0$/
//     if (regPrice.test(value)) {
//         cb();
//     } else {
//         cb(new Error("价格是不小于0的整数"));
//     }
// }

// var checkNumber = (rule, value, cb) => {
//     //验证价格的正则表达式
//     let regNumber = /^[1-9]\d*|0$/
//     if (regNumber.test(value)) {
//         cb();
//     } else {
//         cb(new Error("数量是不小于0的整数"));
//     }
// }
// var checkWeight = (rule, value, cb) => {
//     //验证价格的正则表达式
//     let regWeight = /^[1-9]\d*|0$/
//     if (regWeight.test(value)) {
//         cb();
//     } else {
//         cb(new Error("重量是不小于0的整数"));
//     }
// }
// const QuestionDetailRules = reactive({
//     goods_price: [
//         { required: true, message: "请输入价格", trigger: "blur" },
//         { validator: checkPrice, trigger: "blur" },
//     ],
//     goods_number: [
//         { required: true, message: "请输入数量", trigger: "blur" },
//         { validator: checkNumber, trigger: "blur" },

//     ],
//     goods_weight: [
//         { required: true, message: "请输入重量", trigger: "blur" },
//         { validator: checkWeight, trigger: "blur" },
//     ],
// });


</script>

<style  lang="less" scoped>
.header-title {
    font-size: 18px;
    margin-bottom: 20px;
}

.goBack {
    margin-left: 700px;
}
</style>
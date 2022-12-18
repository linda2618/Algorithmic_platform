<template>
    <div class="addQues">
        <el-card>
            <el-tag class="header-title" size="large" type="primary">添加题目</el-tag>

            <el-form ref="QuestionDetailRef" :label-position="labelPosition" label-width="150px" :model="QuestionDetail"
                :rules="QuestionDetailRules" style="max-width: 800px" :size="size">
                <el-form-item prop="title" label="题目">
                    <el-input v-model="QuestionDetail.title" type="textarea" :rows="3" clearable />
                </el-form-item>
                <el-form-item prop="description" label="题目描述">
                    <el-input v-model="QuestionDetail.description" type="textarea" :rows="13" clearable
                        class="description" />
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
                <el-form-item label="状态" prop="state">
                    <el-input v-model="QuestionDetail.state" size="small" placeholder="
                    题目是否发布(true/false)" style="height: 30px;" />
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
            <el-button type="primary" @click="AddQuestion" size="large"> 确定 </el-button>
            <el-button type="info" @click="resetForm" size="large">取消</el-button>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { AddOneQuestion } from '@/axios/apis.js'
import { ElMessage } from "element-plus";



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

//取消按钮
const resetForm = () => {
    QuestionDetailRef.value.resetFields()
}

//确定按钮
const AddQuestion = async () => {
    const res = await AddOneQuestion(QuestionDetail.value)
    ElMessage({
        type: "success",
        message: res.message,
    });
    QuestionDetailRef.value.resetFields()
}


</script>

<style  lang="less" scoped>
.addQues {

    :deep(.el-textarea__inner) {
        font-size: 20px;
    }

    :deep(.el-form-item__label) {
        font-size: 20px;
    }

    :deep(.el-input__inner) {
        height: 50px;
        font-size: 18px;
    }

    :deep(.el-form-item) {
        font-style: 20px;
    }
}

.header-title {
    font-size: 18px;
    margin-bottom: 20px;
}

.description {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
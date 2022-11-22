<template>
    <div id="box">
        <div class="login_box">
            <div class="title">
                <h1>每日算法</h1>
            </div>
            <el-form ref="loginFormRef" :model="login_Form" status-icon :rules="loginRules" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="账号名" prop="username" style="width:400px">
                    <el-input v-model="login_Form.username" type="input" size="large" />
                </el-form-item>
                <el-form-item label="密码" prop="password" style="width:400px">
                    <el-input v-model="login_Form.password" type="password" autocomplete="off" size="large" />
                </el-form-item>
                <el-form-item>
                    <el-button class="login_button" type="primary" size="large" @click="login">登录/注册</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script setup>
import { reactive } from 'vue'

const login_Form = reactive({
    username: '',
    password: ''
})

const loginRules = reactive({
    username: [
        { required: true, message: "请输入账号名", trigger: "blur" },
        {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
        }],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },]
})

//获取表单元素
const loginFormRef = ref()
//登录/注册按钮
const login = () => {
    //预验证
    loginFormRef.value.validate(valid => {
        // 根据预验证 判断是否发起请求
        if (valid) {

        }

    })



}

</script>

<style lang="less" scoped>
body {
    position: relative;
}

#box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(221, 221, 221, 0.5);
    pointer-events: none;
}

.login_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    height: 500px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 10px 5px 5px rgb(182, 171, 171);
    pointer-events: auto;


    .login_button {
        width: 300px;
    }
}

.title {
    margin: 40px 0px 20px;
    display: flex;
    justify-content: center;
    margin-left: 20px;
    font-family: "Microsoft YaHei";

}
</style>
<template>
    <!-- vuex 页面中直接使用渲染时与vue2中的使用方法相同 -->
    <div id="box" :class="{ type: store.state.showView }">
        <div :class="(login_box, { type: store.state.showReg })">
            <div class="close_box" @click="handleClick">
                <span>x</span>
            </div>
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
                <el-form-item label="确认密码" prop="rePassword" style="width:400px">
                    <el-input v-model="login_Form.rePassword" type="password" autocomplete="off" size="large" />
                </el-form-item>
                <el-form-item>
                    <el-button class="login_button" type="success" plain @click="register" size="large">注册</el-button>
                </el-form-item>
                <el-form-item>

                </el-form-item>
            </el-form>
        </div>


    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { loginApi } from '../../axios/apis'
import { useRouter } from 'vue-router';
//按需引入 useStore()方法
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'


const router = useRouter()

const store = useStore()

// 修改showLoginView的值
const handleClick = () => {
    //触发mutation, 用于同步修改state的信息
    store.commit('changeStyle', !store.state.showView)
    store.commit('changeReg', !store.state.showReg)

}

const login_Form = reactive({
    username: '',
    password: '',
    rePassword: ''
})

const loginRules = reactive({
    username: [
        {
            min: 2,
            max: 8,
            message: "长度在 2到 8 个字符",
            trigger: "blur",
        }],
    password: [
        {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
        }]
})

//获取表单元素
const loginFormRef = ref()

//注册按钮 
const register = () => {
}

//登录按钮
const login = () => {
    // console.log(loginFormRef);
    // console.log(login_Form);
    //预验证
    loginFormRef.value.validate(async (valid) => {
        // 根据预验证 判断是否发起请求
        if (!valid) return;

        const res = await loginApi(login_Form)
        // console.log(res.data);
        // console.log(res.meta);
        if (res.meta.status !== 200) return ElMessage.error('登录失败！')

        ElMessage({
            message: '登录成功!',
            type: 'success',
        })
        window.sessionStorage.setItem('token', res.data.token)
        router.push('/home')
    })
}


</script>

<style lang="less" scoped>
body {
    position: relative;
}

#box {
    z-index: 100;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(221, 221, 221, 0.5);
    // auto——效果和没有定义pointer-events属性相同，鼠标不会穿透当前层。
    pointer-events: auto;

    .login_box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 480px;
        height: 600px;
        border-radius: 20px;
        box-shadow: 10px 5px 5px rgb(225, 219, 219);
        background: #fff;


        .login_button {
            width: 300px;
        }
    }
}



.title {
    margin: 40px 0px 20px;
    display: flex;
    justify-content: center;
    margin-left: 20px;
    font-family: "Microsoft YaHei";

}

.type {
    display: none;
}

.close_box {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 15x;
    right: -50px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(227, 222, 222);
    // 背景线性渐变
    // background: linear-gradient(to bottom right, pink, yellow, violet, skyblue);


    span {
        font-size: 30px;
        color: rgb(125, 127, 127);
        margin-left: 13px;
        line-height: 35px;
    }
}
</style>
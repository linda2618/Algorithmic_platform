<template>
    <!-- vuex 页面中直接使用渲染时与vue2中的使用方法相同 -->
    <div id="box" :class="{ type: store.state.showLoginView }">
        <div class="login_box">
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
                <el-form-item>
                    <el-button class="login_button" type="primary" size="large" @click="login">登录/注册</el-button>
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

const router = useRouter()

// this.$store.state.info
// Vue3中store类似于Vue2中this.$store
// useStore()方法创建store对象，相当于src/store/index.js中的store实例对象
const store = useStore()

// 修改showLoginView的值
const handleClick = () => {
    //触发mutation, 用于同步修改state的信息
    store.commit('changeStyle', !store.state.showLoginView)
}

const login_Form = reactive({
    username: 'admin',
    password: '123456'
})

const loginRules = reactive({
    username: [
        { required: true, message: "请输入账号名", trigger: "blur" },
        {
            min: 5,
            max: 10,
            message: "长度在 65到 10 个字符",
            trigger: "blur",
        }],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },]
})

//获取表单元素
const loginFormRef = ref()

//登录/注册按钮
const login = () => {
    // console.log(loginFormRef);
    // console.log(login_Form);
    //预验证
    loginFormRef.value.validate((valid) => {
        // 根据预验证 判断是否发起请求
        if (!valid) return;

        loginApi(login_Form).then(res => {
            // console.log(res.data);
            window.sessionStorage.setItem('token', res.data.token)
            router.push('/home')
        })
    })
}

// //是否显示登录/注册框
// const showLoginView = ref(false)
// //改变样式显示隐藏登录框
// const changeStyle = () => {
//     showLoginView.value = true
// }

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
    border-radius: 20px;
    box-shadow: 10px 5px 5px rgb(225, 219, 219);
    background: #fff;
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
    // 背景线性渐变
    // background: linear-gradient(to bottom right, pink, yellow, violet, skyblue);


    span {
        font-size: 30px;
        color: rgb(125, 127, 127);
        margin-left: 13px;
        line-height: 40px;
    }
}
</style>
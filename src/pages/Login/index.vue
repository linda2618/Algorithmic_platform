<template>
    <!-- vuex 页面中直接使用渲染时与vue2中的使用方法相同  -->
    <div id="box" :class="{ type: store.state.showView }">
        <div class="login_box">
            <div class="close_box" @click="handleClick">
                <span>x</span>
            </div>
            <div class="title">
                <h1>每日算法</h1>
            </div>
            <el-tabs type="card" class="demo-tabs">
                <el-tab-pane label="登录" class="label_box">
                    <el-form ref="loginFormRef" :model="login_Form" status-icon :rules="loginRules" label-width="100px"
                        class="demo-ruleForm">
                        <el-form-item label="账号名" prop="username" style="width:400px">
                            <el-input v-model="login_Form.username" type="input" :size="size" clearable />
                        </el-form-item>
                        <el-form-item label="输入密码" prop="password" style="width:400px">
                            <el-input v-model="login_Form.password" type="password" :size="size" clearable />
                        </el-form-item>
                        <el-form-item style="width:400px">
                            <el-checkbox class="checkBox" v-model="isAgree" label="同意用户使用准则" name="type" />
                        </el-form-item>
                        <el-form-item style="width:400px">
                            <el-button v-if="isAgree" class="login_button" type="primary" plain :size="size"
                                @click="login">
                                登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="注册">
                    <el-form ref="regFormRef" :model="reg_Form" status-icon :rules="regRules" label-width="100px"
                        class="demo-ruleForm">
                        <el-form-item label="账号名" prop="username" style="width:400px">
                            <el-input v-model="reg_Form.username" type="input" :size="size" clearable />
                        </el-form-item>
                        <el-form-item label="输入密码" prop="password" style="width:400px">
                            <el-input v-model="reg_Form.password" type="password" :size="size" clearable />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="rePassword" style="width:400px">
                            <el-input v-model="reg_Form.rePassword" type="password" :size="size" clearable />
                        </el-form-item>
                        <el-form-item style="width:400px">
                            <el-checkbox class="checkBox" v-model="rAgree" label="同意用户使用准则" name="type" />
                        </el-form-item>
                        <el-form-item style="width:400px">
                            <el-button v-if="rAgree" type="primary" class="login_button" @click="register">
                                注册
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template> 

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { loginApi, regApi, getUserList } from '../../axios/apis'
import { useRouter } from 'vue-router';
//按需引入 useStore()方法
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'


const router = useRouter()

// Vue3中store类似于Vue2中this.$store
// useStore()方法创建store对象，相当于src/store/index.js中的store实例对象
const store = useStore()

// 修改showLoginView的值
const handleClick = () => {
    //触发mutation, 用于同步修改state的信息
    store.commit('changeStyle', !store.state.showLoginView)
}
const users = ref([])
const login_Form = reactive({
    username: '',
    password: '',
})
const reg_Form = reactive({
    username: '',
    password: '',
    rePassword: ''
})
const queryInfo = reactive({
    page: 1
})

const loginRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: "blur" },
        {
            min: 2,
            max: 8,
            message: "长度在 2到 8 个字符",
            trigger: "blur",
        }],
    password: [
        { required: true, message: '请输入密码', trigger: "blur" },
        {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
        }],
})

// var checkRePassword = 
const regRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: "blur" },
        {
            min: 2,
            max: 8,
            message: "长度在 2到 8 个字符",
            trigger: "blur",
        }],
    password: [
        { required: true, message: '请输入密码', trigger: "blur" },
        {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
        }],
    rePassword: [
        { required: true, message: '再次输入密码', trigger: "blur" },
    ]
})

const size = ref('large')
//获取表单元素
const loginFormRef = ref()
const regFormRef = ref()
const isAgree = ref(false)
const rAgree = ref(false)

onMounted(() => {
    getUsersLists()
})

//获取用户列表
const getUsersLists = async () => {
    const res = await getUserList(queryInfo)
    users.value = res.data
}

//登录按钮
const login = () => {
    //预验证
    loginFormRef.value.validate(async (valid) => {
        // 根据预验证 判断是否发起请求
        if (!valid) return;
        const res = await loginApi(login_Form)
        //判断用户存不存在
        if (res.status === 400) return ElMessage.error(res.message)
        //判断用户是否登录成功
        if (res.status === 200) {
            ElMessage({
                message: '登录成功!',
                type: 'success',
            })
            window.sessionStorage.setItem('token', res.data.token)
            router.push('/home')

        } else {
            return ElMessage.error('登录失败！')
        }
    })
}
//注册按钮
const register = () => {
    regFormRef.value.validate(async (valid) => {
        if (!valid) return
        //判断用户名是否已存在
        const exist = users.value.some(v => { return v.username === reg_Form.username })
        if (exist) {
            return ElMessage.error('用户名已存在！')
        }
        //确认密码
        if (reg_Form.rePassword !== reg_Form.password) return ElMessage.error('确认密码错误！')

        const res = await regApi(reg_Form)

        if (res.status === 200) {
            ElMessage({
                message: '注册成功!',
                type: 'success',
            })
        }

    })

}

</script>

<style lang="less" scoped>
body {
    position: relative;
}

.type {
    display: none;
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
        border: 1px solid;


        .login_button {
            width: 300px;
        }
    }
}

.el-tabs {
    --el-tabs-header-height: 55px;

}

.demo-tabs {
    margin-left: 10px;
}

.title {
    margin: 40px 0px 20px;
    display: flex;
    justify-content: center;
    margin-left: 20px;
    font-family: "Microsoft YaHei";

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
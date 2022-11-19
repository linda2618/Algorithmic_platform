<template>
    <div>
        <div class="login_box">
            <h2 class="title">算法在线</h2>
            <el-input v-model="input" placeholder="账号名" clearable />
            <el-input v-model="input" type="password" placeholder="请输入密码" show-password />
        </div>

    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
body {
    position: relative;
}

.login_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    height: 680px;
    background-color: pink;
    border-radius: 20px;
}

.title {
    margin-top: 40px;
}
</style>
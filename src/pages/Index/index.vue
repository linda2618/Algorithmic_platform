<template>
    <div class="index_header">
        <!-- 头部 -->
        <el-header>
            <div class="header_left">
                <ul>
                    <li>
                        <a href="#">学习</a>
                    </li>
                    <li>
                        <a href="#">题库</a>
                    </li>
                    <li>
                        <a href="#">讨论</a>
                    </li>
                    <li>
                        <a href="#">收藏</a>
                    </li>
                </ul>
            </div>
            <div class="header_right">
                <ul>
                    <li><a href="#">登录</a></li>
                    <li><span>或</span></li>
                    <li><a href="#">注册</a></li>
                </ul>
            </div>
        </el-header>

        <!-- 主体区域 -->
        <div class="index_body">
            <div class="container">
                <div class="study">
                    <span>第一块区域</span>
                </div>

            </div>
        </div>

    </div>


</template>

<script setup>

</script>

<style lang="less" scoped>
.index_header {
    background-color: #fff;
}

.el-header {
    width: 1500px;
    margin: 0 auto;
    background-color: #fff;

    .header_left {
        float: left;
        display: flex;
    }

    .header_right {
        float: right;
        display: flex;
        justify-content: right;

    }
}

.index_body {
    background-color: rgb(247, 248, 250);

    .container {
        margin-top: 40px;
        width: 1200px;
        margin: 0 auto;
        background-color: #fff;

        .study {
            height: 100px;
            background-color: pink;
        }

    }
}

ul>li {
    list-style: none;
    float: left;
    font-style: 16px;
    margin-right: 10px;

    a {
        color: #000;
        text-decoration: none;
    }
}
</style>
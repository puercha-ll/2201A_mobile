<template>
    <div class="container">
        <div class="box">
            <p class="text">账号登录</p>
            <div class="user">
                <p>账号</p>
                <el-input class="input" v-model="username" style="width: 240px" placeholder="请输入账号" />
            </div>
            <div class="user">
                <p>密码</p>
                <el-input class="input" v-model="password" style="width: 240px" placeholder="请输入密码" />
            </div>
            <el-button class="btn" type="primary" @click="onLogin">登录</el-button>
        </div>
    </div>
</template>
<script>
import request from '@/utils/request.js'
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        onLogin() {
            console.log(this.username, this.password)
            request.post('/login', { username: this.username, password: this.password }).then(res => {
                if (res.data.code === 200) {
                    // 说明登录成功了
                    ElMessage({
                        message: '登录成功',
                        type: 'success',
                    })
                    // 存储token
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('username', this.username);
                    // 跳转到首页
                    this.$router.replace('/home'); // 3. 实现跳转
                } else {
                    ElMessage.error(res.data.message)
                }
            })
        }
    }
}
</script>
<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/bg.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    min-height: 100vh;

    .box {
        width: 480px;
        height: 300px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;

        padding: 30px;

        .text {
            text-align: center;
            font-size: 28px;
            font-weight: 600;
        }

        .user {
            width: 380px;
            margin: 0 auto;
            padding-top: 30px;
            height: 30px;
            display: flex;
            align-items: center;

            p {
                width: 50px
            }

            .input {
                flex: 1;
            }
        }

        .btn {
            width: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 40px auto;

        }

    }
}
</style>
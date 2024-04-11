<template>
    <div class="container" :class="{ dark: back == true }">
        <img class="bg" src="@/assets/login.svg" alt="">
        <el-switch v-model="back" class="switch" />
        <div class="box">
            <p class="text">账号登录</p>
            <div class="user">
                <p>账号</p>
                <el-input class="input" v-model="username" placeholder="请输入账号" />
            </div>
            <div class="user">
                <p>密码</p>
                <el-input class="input" v-model="password" placeholder="请输入密码" />
            </div>
            <div class="user">
                <el-input v-model="code" placeholder="请输入验证码">
                    <template #append>1234</template>
                </el-input>
            </div>
            <div class="user">
                <el-input v-model="adminCode" placeholder="请输入验证码">
                    <template #append> <el-button @click="sendCode" :disabled="telFlag">{{ msg }}</el-button></template>
                </el-input>
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
            back: false,
            username: '',
            password: '',
            code: '',
            adminCode: '',
            timer: null,
            time: 10,
            msg: '发送验证码',
        }
    },
    computed: {
        telFlag() {
            if (this.msg !== '发送验证码') {
                return true
            } else {
                return false
            }
        },
    },
    methods: {
        onLogin() {
            request.post('/login', { username: this.username, password: this.password, code: this.code }).then(res => {
                console.log(res, 'res')
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
        },
        sendCode() {
            this.timer = setInterval(() => {
                this.time--
                if (this.time === 0) {
                    this.msg = '发送验证码'
                    clearInterval(this.timer)
                    this.time = 10
                } else {
                    this.msg = this.time + 's后重新发送'
                }
            }, 1000)
        }
    }
}
</script>
<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;
    // background-image: url('@/assets/bg.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    min-height: 100vh;

    &.dark {
        background: #333;
    }

    .bg {
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 500px;
    }

    .switch {
        position: fixed;
        right: 40px;
        top: 20px;
    }

    .box {
        width: 480px;
        height: 340px;
        background: #fff;
        position: absolute;
        top: 60%;
        left: 70%;
        transform: translate(-50%, -50%);
        border-radius: 10px;

        padding: 20px;

        .text {
            text-align: center;
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .user {
            width: 380px;
            margin: 0 auto;
            height: 30px;
            display: flex;
            align-items: center;
            margin-bottom: 20px;

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
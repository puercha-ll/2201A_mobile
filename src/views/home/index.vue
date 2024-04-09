<template>
    <div>
        <!-- 顶部 -->
        <div class="top">
            <div class="left">XXX后台管理系统</div>
            <div class="right">退出登录</div>
        </div>
        <div class="container">
            <el-menu :router="true" :default-active="$route.path">
                <el-menu-item index="/role">
                    <el-icon>
                        <ChatDotRound />
                    </el-icon>
                    <span>角色管理</span>
                </el-menu-item>
                <el-menu-item index="/user">
                    <el-icon>
                        <ChatLineRound />
                    </el-icon>
                    <span>用户列表</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main">
            <router-view />
        </div>
    </div>
</template>
<style scoped lang="scss">
.top {
    width: 100%;
    background: #fff;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;

    .left {
        padding-left: 30px;
        font-size: 22px;
    }

    .right {
        padding-right: 30px;
        cursor: pointer
    }
}

.container {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 50px;
    height: 100vh;
    overflow-y: auto;
    background: #fff;
    width: 180px;

}

.main {
    position: absolute;
    top: 60px;
    left: 180px;
    right: 0;
    padding: 10px 10px;

}
</style>
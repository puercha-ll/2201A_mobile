<template>
    <div>
        <!-- 顶部 -->
        <div class="top">
            <div class="left">XXX后台管理系统</div>
            <div class="right">
                <div class="username">{{ username }}</div>
                <el-popconfirm title="您确定退出登录吗?" @confirm="onConfirm">
                    <template #reference>
                        <div class="loginout">退出登录</div>
                    </template>
                </el-popconfirm>
            </div>
        </div>
        <div class="container">
            <!-- <el-menu class="menu" background-color="#1d1e1f" text-color="#fff" active-text-color="#ffd04b"
                :router="true" :default-active="$route.path">
                <el-menu-item index="/role">
                    <el-icon>
                        <HelpFilled />
                    </el-icon>
                    <span>角色管理</span>
                </el-menu-item>
                <el-menu-item index="/user">
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <span>用户列表</span>
                </el-menu-item>
                <el-sub-menu index="/menu">
                    <template #title>
                        <el-icon>
                            <Tools />
                        </el-icon>
                        <span>菜单管理</span>
                    </template>
                    <el-menu-item index="/menu">
                        <template #title>
                            <el-icon>
                                <Tools />
                            </el-icon>
                            <span>菜单管理</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/other">
                        <template #title>
                            <el-icon>
                                <Folder />
                            </el-icon>
                            <span>其他页面</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu> -->
            <el-menu class="menu" background-color="#1d1e1f" text-color="#fff" active-text-color="#ffd04b"
                :router="true" :default-active="$route.path">
                <div v-for="item in menuList" :key="item.id">

                    <el-menu-item v-if="item.children.length == 0" :index="item.router">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.title }}</span>
                    </el-menu-item>
                    <!-- 菜单权限 -->
                    <template v-if="role == 'admin'">
                        <el-sub-menu v-if="item.children.length > 0" :index="item.id">
                            <template #title>
                                <el-icon>
                                    <component :is="item.icon"></component>
                                </el-icon>
                                <span>{{ item.title }}</span>
                            </template>
                            <div v-for="i in item.children" :key="i.id">
                                <el-menu-item :index="i.router"> <template #title>
                                        <el-icon>
                                            <component :is="i.icon"></component>
                                        </el-icon>
                                        <span>{{ i.title }}</span>
                                    </template></el-menu-item>
                            </div>
                        </el-sub-menu>
                    </template>
                </div>
            </el-menu>
        </div>
        <div class="main">
            <router-view />
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            username: localStorage.getItem('username'),
            menuList: [
                { id: '1', icon: 'HelpFilled', title: '角色管理', router: '/role', children: [] },
                { id: '2', icon: 'UserFilled', title: '用户列表', router: '/user', children: [] },
                {
                    id: '3', icon: 'Tools', title: '菜单管理', router: '/menu',
                    children: [
                        { id: '3-1', icon: 'Tools', title: '菜单管理', router: '/menu' },
                        { id: '3-2', icon: 'Folder', title: '其他页面', router: '/other' }
                    ]
                },
            ]
        }
    },
    computed: {
        ...mapState(['role'])
    },
    methods: {
        onConfirm() {
            localStorage.removeItem('token')
            this.$router.push('/login')
        }
    }
}
</script>
<style scoped lang="scss">
.top {
    width: 100%;
    // background: #fff;
    background: #1d1e1f;
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
        display: flex;
        line-height: 30px;

        .username {
            color: #409eff;

        }

        .loginout {
            margin-left: 30px;
            cursor: pointer;
        }
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

    .menu {
        height: 100%;
    }

}

.main {
    position: absolute;
    top: 60px;
    left: 180px;
    right: 0;
    padding: 10px 10px;

}
</style>
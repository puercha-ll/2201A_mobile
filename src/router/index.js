import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/',
    redirect: 'home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    redirect: '/role',
    children: [
      {
        path: '/role',
        name: 'role',
        component: () => import('../views/role/index.vue'),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/index.vue'),
      },
      {
        path: '/user/detail/:id',
        name: 'userDetail',
        component: () => import('../views/user/detail.vue'),
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('../views/menu/index.vue'),
      },
      {
        path: '/other',
        name: 'other',
        component: () => import('../views/other/index.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("token")) {
    if (to.path == "/login") {
      next();
    } else {
      ElMessage.error('请重新登录')
      next("/login");
    }
  } else {
    if (to.path == "/login") {
      next("/home");
    }
  }
  next();
});
export default router

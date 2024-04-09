import { createRouter, createWebHistory } from 'vue-router'

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

export default router

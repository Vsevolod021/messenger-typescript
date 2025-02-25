import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    name: 'main',
    component: () => import('@/Pages/Main/Main.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/Pages/Auth/Auth.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/main'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

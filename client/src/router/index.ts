import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    name: 'main',
    component: () => import('@/Pages/Main/Main.vue'),
    meta: { requiresAuth: true }
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

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  const token = localStorage.getItem('token');

  if (requiresAuth) {
    if (!token) {
      return next({ name: 'auth' });
    }
    return next();
  }

  if (token) {
    return next({ name: 'main' });
  }

  next();
});

export default router;

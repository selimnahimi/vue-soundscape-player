import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/import',
      name: 'import',
      component: () => import('@/views/ImportView.vue')
    },
    {
      path: '/sounds',
      name: 'sounds',
      component: () => import('@/views/SoundView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
  ]
})

export default router

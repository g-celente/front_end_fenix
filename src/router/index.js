import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import beforeEach from './beforeEach.js'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: true }    
    }
    /*
    {
      path: '/about',
      meta: { requiresAuth: true},
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/perfil',
      meta: { requiresAuth: true},
      component: () => import('../views/user/UserView.vue')
    }
    */
  ],
})

router.beforeEach(beforeEach)

export default router

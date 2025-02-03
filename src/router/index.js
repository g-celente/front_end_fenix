import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ClientsView from '@/views/ClientsView.vue'
import UserView from '@/views/UserView.vue'
import beforeEach from './beforeEach.js'
import TheContainer from '@/components/TheContainer.vue'


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
        component: TheContainer,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: 'Home',
            component: HomeView
          },
          {
            path: "/clientes",
            name: 'Clientes',
            component: ClientsView
          }, 
          {
            path: "/cliente/:id",
            name: "Cliente",
            component: UserView
          }
        ]   
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

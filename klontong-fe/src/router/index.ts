import { createRouter, createWebHistory } from 'vue-router'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'
import ProductList from '../pages/Product/ProductList.vue'
import ProductAdd from '../pages/Product/ProductAdd.vue'
import ProductDetail from '../pages/Product/ProductDetail.vue'
import {useAuthStore} from '../store/AuthStore.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register', 
      name: 'register',
      component: Register 
    },
    {
      path: '/product', 
      name: 'product',
      component: ProductList,
      meta: { requiresAuth: true }
    },
    {
      path: '/product/add', 
      name: 'product-add',
      component: ProductAdd,
      meta: { requiresAuth: true }
    },
    {
      path: '/product/:id', 
      name: 'product-detail',
      component: ProductDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*', 
      component: NotFound 
    }
  ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    
    // Check if the route requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // If not authenticated, redirect to login
      if (!authStore.isAuthenticated) {
        next({
          name: 'login',
          query: { redirect: to.fullPath } // Store the attempted URL for redirect after login
        })
      }else {
        next() // Proceed to route
      }
    } else {
      next() // Doesn't require auth, proceed
    }
})

export default router
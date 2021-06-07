import { createRouter, createWebHistory } from 'vue-router'

/*** Begin Dashboard component(s)  */
import Dashboard from '@/components/Pages/Dashboard/Index.vue'

/*** Begin Institute component(s)  */
import InstituteList from '@/components/Pages/Institutes/Index.vue'

/*** Begin User component(s)  */
import UserList from '@/components/Pages/Users/Index.vue'
import UserCreate from '@/components/Pages/Users/Create.vue'
import UserEdit from '@/components/Pages/Users/Edit.vue'


/*** Begin Auth component(s)  */
import Login from '@/components/Pages/Auth/Login.vue'
import Register from '@/components/Pages/Auth/Register.vue'

/*** Begin Error component(s)  */
import ErrorPage from '@/components/Error.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/institutes',
    name: 'institutes',
    component: InstituteList
  },
  {
    path: '/users',
    name: 'users',
    component: UserList,
  },
  {
    path: '/users/create',
    name: 'userCreate',
    component: UserCreate,
  },
  
  {
    path: '/users/:id/edit',
    name: 'userEdit',
    component: UserEdit,
    params: true,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/error-page',
    name: 'error-page',
    component: ErrorPage
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "side-menu--active",
  linkExactActiveClass: "exact-active",
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

export default router

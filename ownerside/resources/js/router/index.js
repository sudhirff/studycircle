import { createRouter, createWebHistory } from "vue-router";
import store from '../store/index.js';

/*** Begin Dashboard component(s)  */
import Dashboard from '@/components/Pages/Dashboard/Index.vue'

/*** Begin Institute component(s)  */
import InstituteList from '@/components/Pages/Institutes/Index.vue'
import InstituteCreate from '@/components/Pages/Institutes/Create.vue'

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
        redirect: '/dashboard',
        meta: { requiresAuth: true }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/institutes',
        name: 'institutes',
        component: InstituteList,
        meta: { requiresAuth: true },
        /*children: [
            {
                path:'/institutes/create',
                name: 'instituteCreate',
                component: InstituteCreate,
                meta: { requiresAuth: true }
            }
        ],*/
    },
    {
        path:'/institutes/create',
        name: 'instituteCreate',
        component: InstituteCreate,
        meta: { requiresAuth: true }
    },
    {
        path: '/users',
        name: 'users',
        component: UserList,
        meta: { requiresAuth: true },
        children: [
        {
            path: '/create',
            name: 'userCreate',
            component: UserCreate,
            meta: { requiresAuth: true },
        },
        {
            path: '/:id/edit',
            name: 'userEdit',
            component: UserEdit,
            props: true,
            meta: { requiresAuth: true },
        },
    ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresUnauth: true }
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/profile',
        name: 'profile',
        component: Register
    },
    {
        path: '/reset-password',
        name: 'resetPassword',
        component: Register
    },
    {
        path: '/error-page',
        name: 'error-page',
        component: ErrorPage
    },
    /*{
        path: '/:pathMatch(.*)*',
        component: ErrorPage
    }*/
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "side-menu--active router-active-link",
    linkExactActiveClass: "exact-active",
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    }
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
      next('/login');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
      next('/dashboard');
    } else {
      next();
    }
  });
export default router;
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../Pages/Dashboard.vue'

const routes = [
    {
        path: '/',
        component: Dashboard,
        children: [
            {
                path: '/',
                name: 'side-menu-dashboard-overview-1',
                component: Dashboard
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard
            },
        ]
    }
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    }
})


/*export function useRouter() {
    return router
}
export function useRoute() {
    return routes
}*/
export default router
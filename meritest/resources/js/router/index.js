import { createRouter, createWebHistory } from "vue-router";

import Home from '../pages/Home.vue';
import AboutUs from '../pages/AboutUs.vue';
import ContactUs from '../pages/ContactUs.vue';
import Blogs from '../pages/Blogs.vue';
import HowItWorks from '../pages/HowItWorks.vue';
import Features from '../pages/Features.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about-us',
        name: 'aboutUs',
        component: AboutUs
    },
    {
        path: '/how-it-works',
        name: 'howItWorks',
        component: HowItWorks
    },
    {
        path: '/contact-us',
        name: 'ContactUs',
        component: ContactUs
    },
    {
        path: '/blogs',
        name: 'blogs',
        component: Blogs
    },
    {
        path: '/features',
        name: 'features',
        component: Features
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    }
});
export default router;
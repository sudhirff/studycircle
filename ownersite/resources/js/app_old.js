require('./bootstrap');

// Import modules...

import { createApp, h } from 'vue';
import { App as InertiaApp, plugin as InertiaPlugin } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import VueRouter from 'vue-router'

import router from './Router/index'
import store from './Store/index'
import App from './App.vue'

const el = document.getElementById('app');

createApp({
    render: () =>
        h(InertiaApp, {
            initialPage: JSON.parse(el.dataset.page),
            resolveComponent: (name) => require(`./Pages/${name}`).default,
        }),
})
    .mixin({ methods: { route } })
    .use(InertiaPlugin, VueRouter)
    .mount(el);

InertiaProgress.init({ color: '#4B5563' });

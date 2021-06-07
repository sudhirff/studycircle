require('./bootstrap');

// Import modules...

import { createApp, h } from 'vue';
import { App as InertiaApp, plugin as InertiaPlugin } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';

//import FeatherIcons from 'feather-icons'
import * as FeatherIcons from 'vue-feather-icons'


import router from './Router/index'
import store from './Store/index'
//import '../../public/owner/sass/app.scss'

const el = document.getElementById('app');

createApp({
        render: () =>
            h(InertiaApp, {
                initialPage: JSON.parse(el.dataset.page),
                resolveComponent: (name) => require(`./Pages/${name}`).default,
            }),
    })
    .mixin({ 
        methods: { 
            route
        } 
    })
    .use(InertiaPlugin)
    .use(store)
    .use(router)
    .use(FeatherIcons)
    .mount(el);
InertiaProgress.init({ color: '#4B5563' });

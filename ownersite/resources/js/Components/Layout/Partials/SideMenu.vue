<template>
    
    <nav class="side-nav">
        <ul>
            <li>
                <inertia-link href="/dashboard" class="side-menu side-menu--active" preserve-scroll>
                    <div class="side-menu__icon"> <i data-feather="home"></i> </div>
                    <div class="side-menu__title">
                        Dashboard 
                        <div class="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </inertia-link>
            </li>
            <li>
                <inertia-link href="/about" class="side-menu side-menu">
                    <div class="side-menu__icon"> <i data-feather="home"></i> </div>
                    <div class="side-menu__title">
                        About 
                        <div class="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </inertia-link>
            </li>
            <li>
                <inertia-link href="/user/profile" class="side-menu side-menu" preserve-scroll>
                    <div class="side-menu__icon"> <i data-feather="home"></i> </div>
                    <div class="side-menu__title">
                        Profile 
                        <div class="side-menu__sub-icon transform rotate-180"> <i data-feather="chevron-down"></i> </div>
                    </div>
                </inertia-link>
            </li>
        </ul>
    </nav>
</template>

<script>
//import feather from 'feather-icons'
import { computed, onMounted, ref, watch } from 'vue'
import { helper as $h } from '@/utils/helper'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/Store'
import { linkTo, nestedMenu, enter, leave } from '@/menu_loader.js'

export default {

    /*setup() {
        
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        const formattedMenu = ref([])
        onMounted(() => {
            const id = route.params.id
        })
        const sideMenu = computed(() =>
            nestedMenu(store.state.sideMenu.menu, route)
        )

        watch(
            computed(() => route.path),
                () => {
                    formattedMenu.value = $h.toRaw(sideMenu.value)
                }
        )
        onMounted(() => {
            formattedMenu.value = $h.toRaw(sideMenu.value)
        })

        return {
            formattedMenu,
            linkTo,
            enter,
            leave
        }
    }*/
}
</script>

<style>

</style>
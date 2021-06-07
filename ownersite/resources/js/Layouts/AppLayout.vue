<template>
    <div>
        <MobileMenu />
        <TopBar />
        <div class="wrapper">
            <div class="wrapper-box">
                <!-- BEGIN: Side Menu -->
                <SideMenu />
                <!-- END: Side Menu -->
                <!-- BEGIN: Content -->
                <div class="content">
                    <slot></slot>
                </div>
                <!-- END: Content -->
            </div>
        </div>
    </div>
</template>


<script>
import feather from 'feather-icons'
import { computed, onMounted, ref, watch, onBeforeMount } from 'vue'

import cash from "cash-dom";
import MobileMenu from '@/Components/Layout/Partials/MobileMenu'
import TopBar from '@/Components/Layout/Partials/TopBar'
import SideMenu from '@/Components/Layout/Partials/SideMenu'

export default {
    components: {
        MobileMenu,
        TopBar,
        SideMenu
    },
    setup() {
        /*const router = useRouter()
        const route = useRoute()
        const store = useStore()
        const formattedMenu = ref([])
        
        const sideMenu = computed(() =>
            nestedMenu(store.state.sideMenu.menu, route)
        )

        watch(
            computed(() => route.path),
                () => {
                    formattedMenu.value = $h.toRaw(sideMenu.value)
                }
        )*/

        onBeforeMount(() => {
            cash('body')
                .removeClass('error-page')
                .removeClass('login')
                .addClass('main')
            //formattedMenu.value = $h.toRaw(sideMenu.value)
        })

        /*return {
            //formattedMenu,
            //linkTo,
            //enter,
            //leave
        }*/
    },
    mounted() {
            feather.replace();
        }

}
</script>

<style>

</style>
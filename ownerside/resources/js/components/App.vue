<template>
    <div class="flex overflow-hidden">
        <!-- BEGIN: Side Menu -->
        <SideMenu />
        <!-- END: Side Menu -->
        <!-- BEGIN: Content -->
        <div class="content">
            <!-- BEGIN: Top Bar -->
            <TopBar />
            <!-- END: Top Bar -->
            <router-view />
        </div>
        <!-- END: Content -->
    </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { helper as $h } from '@/utils/helper'
import TopBar from "./shared/TopBar"
//import MobileMenu from './shared/MobileMenu'
import SideMenuTooltip from './shared/SideMenuTooltip'
import SideMenu from './shared/SideMenu'
//import { linkTo, nestedMenu, enter, leave } from './index'

export default defineComponent({
  components: {
    TopBar,
    //MobileMenu,
    SideMenu,
    SideMenuTooltip
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    /*const store = useStore()
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

    onMounted(() => {
      cash('body')
        .removeClass('error-page')
        .removeClass('login')
        .addClass('main')
      //formattedMenu.value = $h.toRaw(sideMenu.value)
    })

    return {
      //formattedMenu,
      router,
      //linkTo,
      //enter,
      //leave
    }
  }
})
</script>

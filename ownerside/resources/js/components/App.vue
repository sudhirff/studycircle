<template>
    <div class="flex overflow-hidden">
        <!-- BEGIN: Side Menu -->
        <the-side-menu />
        <!-- END: Side Menu -->
        <!-- BEGIN: Content -->
        <div class="content">
            <!-- BEGIN: Top Bar -->
            <the-top-bar />
            <!-- END: Top Bar -->
            <!-- Our main content will come here -->
            <router-view />
            <!-- END: Main content -->
        </div>
        <!-- END: Content -->
    </div>
</template>

<script>
import { onMounted } from 'vue'

//import TheMobileMenu from './layouts/TheMobileMenu'
import TheTopBar from "./layouts/TheTopBar"
import TheSideMenu from './layouts/TheSideMenu'

export default {
  components: {
    TheTopBar,
    //TheMobileMenu,
    TheSideMenu,
  },
  setup() {
    //console.log(this.$route.name);
    onMounted(() => {
      cash('body')
        .removeClass('error-page')
        .removeClass('login')
        .addClass('main')
    })

    return {
    }
  }
}
</script>

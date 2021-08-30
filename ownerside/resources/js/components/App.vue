<template>
    <div class="flex overflow-hidden" v-if="authenticated">
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
    <div v-else>
        <router-view />
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';


//import TheMobileMenu from './layouts/TheMobileMenu'
import TheTopBar from "./layouts/TheTopBar"
import TheSideMenu from './layouts/TheSideMenu'
import { useStore } from 'vuex';

export default {
  components: {
    TheTopBar,
    //TheMobileMenu,
    TheSideMenu,
  },
  setup() {
    const store = useStore();
    //const authenticated = ref(store.getters.isAuthenticated);

    onMounted(() => {
      cash('body')
        .removeClass('error-page')
        .removeClass('login')
        .addClass('main')
    });

    store.dispatch('tryLogin');
    return {
      //authenticated
    }
  },

  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
    authenticated() {      
      return this.$store.getters.isLoggedIn;
    }
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.authenticated = false;
        //window.location.replace('/login');
        this.$router.go('/login');
      }
    }
  }
}
</script>

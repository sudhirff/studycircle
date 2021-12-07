<template>

    <div v-if="authenticated">
        <the-top-bar />
        <div class="wrapper">
            <div class="wrapper-box">
                <the-side-menu />
            
                <div class="content">
                    <router-view />
                </div>
            </div>
        </div>
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

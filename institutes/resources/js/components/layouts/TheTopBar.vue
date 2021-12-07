<template>
    <!-- BEGIN: Top Bar -->
    <div
        class="top-bar-boxed border-b border-theme-2 -mt-7 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12"
    >
        <div class="h-full flex items-center">
            <!-- BEGIN: Logo -->
            <router-link to="/dashboard" class="-intro-x hidden md:flex">
                <img
                alt="Powered by Meritest.in"
                class="w-20"
                :src="getImage('logo/logo.png')"
                />
            </router-link>
            <!-- END: Logo -->
            <!-- BEGIN: Breadcrumb -->
            <the-breadcrumb />
            
            <!-- END: Breadcrumb -->
            <!-- BEGIN: Account Menu -->
            <div class="intro-x dropdown w-8 h-8">
                <div
                    class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
                    role="button"
                    aria-expanded="false"
                >
                    <img alt="User Profile" :src="getImage('profile-5.jpg')">
                </div>
                <div class="dropdown-menu w-56">
                    <div class="dropdown-menu__content box bg-theme-11 dark:bg-dark-6 text-white">
                        <div class="p-4 border-b border-theme-12 dark:border-dark-3">
                        <div class="font-medium">Pallavi Dighe</div>
                        <div class="text-xs text-theme-13 mt-0.5 dark:text-gray-600">Engineer</div>
                    </div>
                    <div class="p-2">
                        <router-link to="/profile"
                            class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md">
                            <UserIcon class="w-4 h-4 mr-2" /> Profile
                        </router-link>
                    </div>
                    <div class="p-2 border-t border-theme-12 dark:border-dark-3">
                        <a href="/logout" 
                            class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
                             @click.prevent="logout"> 
                            <ToggleRightIcon class="w-4 h-4 mr-2" /> Logout 
                        </a>
                    </div>
                </div>
                </div>
            </div>
        <!-- END: Account Menu -->
        </div>
    </div>
  <!-- END: Top Bar -->
</template>

<script>
import { defineComponent, ref } from 'vue'

import TheBreadcrumb from '@/components/layouts/TheBreadcrumb'

export default defineComponent({
    components: {
        TheBreadcrumb
    },
    setup() {
        const searchDropdown = ref(false)

        const showSearchDropdown = () => {
        searchDropdown.value = true
        }

        const hideSearchDropdown = () => {
        searchDropdown.value = false
        }

        return {
        searchDropdown,
        showSearchDropdown,
        hideSearchDropdown
        }
    },
    methods: {
        getImage(image)
        {
            return "/institute/images/"+image;
        },
        async logout() {
            await this.$store.dispatch('logout');
            window.location.href = "/login";
        }
    }
})
</script>

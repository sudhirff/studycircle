<template>
    <!-- BEGIN: Top Bar -->
    <div class="top-bar -mx-4 px-4 md:mx-0 md:px-0">
        <!-- BEGIN: Breadcrumb -->
        <Breadcrumb />
        
        <!-- END: Breadcrumb -->
        <!-- BEGIN: Search -->
        <div class="intro-x relative mr-3 sm:mr-6">
            <div class="search hidden sm:block">
                <input type="text" class="search__input form-control border-transparent placeholder-theme-13" placeholder="Search...">
                <SearchIcon class="search__icon dark:text-gray-300" /> 
            </div>
        </div>
        <!-- END: Search -->
        <!-- BEGIN: Account Menu -->
        <div class="intro-x dropdown w-8 h-8">
            <div class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in" 
                role="button" 
                aria-expanded="false"
                >
                <img alt="User Profile" :src="getImage('profile-5.jpg')">
            </div>
            <div class="dropdown-menu w-56">
                <div class="dropdown-menu__content box dark:bg-dark-6">
                    <div class="p-4 border-b border-black border-opacity-5 dark:border-dark-3">
                        <div class="font-medium">Johnny Depp</div>
                        <div class="text-xs text-gray-600 mt-0.5 dark:text-gray-600">DevOps Engineer</div>
                    </div>
                    <div class="p-2">
                        <router-link to="/profile" 
                            class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-dark-3 rounded-md"> 
                            <UserIcon class="w-4 h-4 mr-2" /> Profile 
                        </router-link>
                        <router-link to="" 
                                    class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-dark-3 rounded-md"> 
                            <LockIcon class="w-4 h-4 mr-2" /> Reset Password 
                        </router-link>
                        
                    </div>
                    <div class="p-2 border-t border-black border-opacity-5 dark:border-dark-3">
                        <router-link to="/logout" class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-dark-3 rounded-md"> 
                            <ToggleRightIcon class="w-4 h-4 mr-2" /> Logout 
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- END: Account Menu -->
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Breadcrumb from '@/components/shared/Breadcrumb'

export default defineComponent({
    components: {
        Breadcrumb
    },
    setup() {
        const searchDropdown = ref(false);

        const showSearchDropdown = () => {
            searchDropdown.value = true;
        }

        const hideSearchDropdown = () => {
            searchDropdown.value = false;
        }

        // Show hide account drop down

        return {
            searchDropdown,
            showSearchDropdown,
            hideSearchDropdown,
        }
    },
    methods: {
        getImage(image)
        {
            return "/owner/images/"+image;
        }
    }
})
</script>

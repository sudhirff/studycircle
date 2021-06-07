<template>
    <!-- BEGIN: Top Bar -->
    <div class="top-bar-boxed border-b border-theme-2 -mt-7 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12">
        <div class="h-full flex items-center">
            <!-- BEGIN: Logo -->
            <a href="" class="-intro-x hidden md:flex">
                <span class="text-white text-lg ml-3">
                    Study<span class="font-medium">Circle</span>
                </span>
            </a>
            <!-- END: Logo -->
            <!-- BEGIN: Breadcrumb -->
            <div class="-intro-x breadcrumb mr-auto">
                <a href="">Application</a>
                    <div class="breadcrumb__icon"> <i data-feather="chevron-right"></i> </div>
                    
                <a href="" class="breadcrumb--active">Dashboard</a>
            </div>
            <!-- END: Breadcrumb -->
            <!-- BEGIN: Search -->
            <div class="intro-x relative mr-3 sm:mr-6">
                <div class="search hidden sm:block">
                    <input
                        type="text"
                        class="search__input form-control dark:bg-dark-1 border-transparent placeholder-theme-8"
                        placeholder="Search..."
                        @focus="showSearchDropdown"
                        @blur="hideSearchDropdown"
                    />
                    <SearchIcon class="search__icon dark:text-gray-300" />
                </div>
                <a class="notification sm:hidden" href="">
                    <SearchIcon class="notification__icon dark:text-gray-300" />
                </a>
                <div class="search-result" :class="{ show: searchDropdown }">
                    <div class="search-result__content">
                        <div class="search-result__content__title">Pages</div>
                        <div class="mb-5">
                            <a href="" class="flex items-center">
                                <div class="w-8 h-8 bg-theme-29 text-theme-10 flex items-center justify-center rounded-full">
                                    <InboxIcon class="w-4 h-4" />
                                </div>
                                <div class="ml-3">Mail Settings</div>
                            </a>
                            <a href="" class="flex items-center mt-2">
                                <div class="w-8 h-8 bg-theme-30 text-theme-24 flex items-center justify-center rounded-full">
                                    <UsersIcon class="w-4 h-4" />
                                </div>
                                <div class="ml-3">Users & Permissions</div>
                            </a>
                            <a href="" class="flex items-center mt-2">
                                <div class="w-8 h-8 bg-theme-31 text-theme-26 flex items-center justify-center rounded-full">
                                    <CreditCardIcon class="w-4 h-4" />
                                </div>
                                <div class="ml-3">Transactions Report</div>
                            </a>
                        </div>
                        <div class="search-result__content__title">Users</div>
                    </div>
                </div>
            </div>
            <!-- END: Search -->
            
            <!-- BEGIN: Account Menu -->
            <div class="intro-x dropdown w-8 h-8">
                <div v-if="$page.props.jetstream.managesProfilePhotos" 
                    class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
                    role="button"
                    aria-expanded="false"
                    >
                    <img class="h-10 w-10 rounded-full object-cover" :src="$page.props.user.profile_photo_url" :alt="$page.props.user.name" />
                </div>
                <div class="dropdown-menu w-56" id="accountSetting" ref="accountSetting">
                    <div
                        class="dropdown-menu__content box bg-theme-11 dark:bg-dark-6 text-white"
                    >
                        <div class="p-4 border-b border-theme-12 dark:border-dark-3">
                            <div class="font-medium">{{ $page.props.user.name }}</div>
                            <div class="text-xs text-theme-13 mt-0.5 dark:text-gray-600">
                                {{ $page.props.user.email }}
                            </div>
                        </div>
                        <div class="p-2">
                            <NavLink :href="route('profile.show')" 
                                                    :active="route().current('profile.show')"
                                                    class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
                                                    >
                                <UserIcon class="w-4 h-4 mr-2" /> Profile
                            </NavLink>
                            <NavLink :href="route('api-tokens.index')" :active="route().current('api-tokens.index')" v-if="$page.props.jetstream.hasApiFeatures">
                                API Tokens
                            </NavLink>
                        </div>
                        <div class="p-2 border-t border-theme-12 dark:border-dark-3">
                            <!-- Authentication -->
                            <form method="POST" @submit.prevent="logout">
                                <NavButton class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md">
                                    <ToggleRightIcon class="w-4 h-4 mr-2" /> Log Out
                                </NavButton>
                            </form>
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
 import JetApplicationMark from '@/Jetstream/ApplicationMark'
import JetBanner from '@/Jetstream/Banner'
import JetDropdown from '@/Jetstream/Dropdown'
import JetDropdownLink from '@/Jetstream/DropdownLink'
import JetNavLink from '@/Jetstream/NavLink'



import NavLink from '@/Components/Common/NavLink'
import NavButton from '@/Components/Common/NavButton'

import cash from 'cash-dom'

export default defineComponent({
    components: {
            JetApplicationMark,
            JetBanner,
            JetDropdown,
            JetDropdownLink,
            JetNavLink,

            NavLink,
            NavButton
        },
        data() {
            return {
                showingNavigationDropdown: false,
            }
        },

        methods: {
            switchToTeam(team) {
                this.$inertia.put(route('current-team.update'), {
                    'team_id': team.id
                }, {
                    preserveState: false
                })
            },

            logout() {
                console.log(this.$refs['accountSetting']); 
                return  false;
                this.$inertia.post(route('logout'));
            },
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
        }
})
</script>

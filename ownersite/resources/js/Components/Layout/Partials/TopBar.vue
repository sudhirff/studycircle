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
                    <ChevronRightIcon class="breadcrumb__icon" />
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
            
        </div>
    </div>
    <!-- END: Top Bar -->
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
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

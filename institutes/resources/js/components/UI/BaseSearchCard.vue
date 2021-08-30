<template>
  <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <div class="w-56 relative text-gray-700 dark:text-gray-300">
        <input
            type="text"
            class="form-control w-56 box pr-10 placeholder-theme-13"
            placeholder="Search..."
            v-model.trim="search"
        />
        <SearchIcon
            class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
        />
        </div>
    </div>
</template>

<script>
import { watch } from "vue";

export default {
    setup() {
        
    }

}
</script>

<style>

</style>
<template>
  <div>
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            
            <span class="text-white text-lg ml-3">
              Study<span class="font-medium">Circle</span>
            </span>
          </a>
          <div class="my-auto">
            
            <div
              class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
            >
              A few more clicks to <br />
              sign in to your account.
            </div>
            <div class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500">
              Manage all your e-commerce accounts in one place
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <slot></slot>
        
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch, onBeforeMount } from 'vue'
import cash from "cash-dom";
export default {
  
    
    setup() {

        onBeforeMount(() => {
            cash('body')
                .removeClass('error-page')
                .removeClass('main')
                .addClass('login')
            //formattedMenu.value = $h.toRaw(sideMenu.value)
        })
    },
}
</script>
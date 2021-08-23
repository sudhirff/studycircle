<template>
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <div class="-intro-x flex items-center pt-5 logo">
            <img
                alt="Studycircle"
                :src="getImage('logo/logo.png')"
                />
          </div>
          <div class="my-auto">
            <img
              alt="Time to have fun with learning"
              class="-intro-x w-1/2 -mt-16"
              :src="getImage('illustration.svg')"
            />
            <div
              class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
            >
              A few more clicks to <br />
              sign in to your account.
            </div>
            <div
              class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500"
            >
              Manage all your account in one place
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              Sign In
            </h2>
            <div class="intro-x mt-2 text-gray-500 xl:hidden text-center">
              A few more clicks to sign in to your account. Manage your account in one place
            </div>
            <div class="alert alert-danger show flex items-center mb-2" role="alert" v-if="error">
                <AlertOctagonIcon class="w-6 h-6 mr-2" />
                {{ message }}
            </div>
            <form @submit.prevent="handleLogin">
              <div class="intro-x mt-8">
                <input
                  type="text"
                  class="intro-x login__input form-control py-3 px-4 border-gray-300 block"
                  placeholder="Email"
                  v-model="user.email"
                  :class="{ 'border-theme-21': submitted && v$.email.$error }"
                />
                <span v-if="submitted && v$.email.$error" class="text-theme-21 mt-2">
                    {{ v$.email.$errors[0].$message }}
                </span>
                <input
                  type="password"
                  class="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
                  placeholder="Password"
                  v-model="user.password"
                  :class="{ 'border-theme-21': submitted && v$.password.$error }"
                />
                <span v-if="submitted && v$.password.$error" class="text-theme-21 mt-2">
                    {{ v$.password.$errors[0].$message }}
                </span>
              </div>
              <!-- <div
                class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
              >
                <div class="flex items-center mr-auto">
                  <input
                    id="remember-me"
                    type="checkbox"
                    class="form-check-input border mr-2"
                  />
                  <label class="cursor-pointer select-none" for="remember-me"
                    >Remember me</label
                  >
                </div>
                <a href="">Forgot Password?</a>
              </div>-->
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button
                  class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <loading v-if="isLoading" fixed></loading>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted, ref, reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators'
import axios from 'axios'
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = reactive({
        email: '',
        password: '',
    });

    const error = ref(false);
    const submitted = ref(false);
    const message = ref('');
    const isLoading = ref(false);

    const rules = computed(() => {
        return {
            email: {
                required: helpers.withMessage('Please enter your email address.', required),
                email: helpers.withMessage('Please enter valid email address.', email),
            },
            password: {
                required: helpers.withMessage('Please enter password.', required),
            }
        }
    });

    const v$ = useVuelidate (rules, user);

    onMounted(() => {
      cash('body')
        .removeClass('main')
        .removeClass('error-page')
        .addClass('login')
    });

    function handleLogin() {
        isLoading.value = true;
        
        submitted.value = true;
        v$.value.$validate(); // checks all inputs

        if (!v$.value.$error) {
            isLoading.value = true;
            try {
              store.dispatch('login', user);
              submitted.value = false;
              isLoading.value = false;
              
            }catch(e) {
              isLoading.value = false;
              error.value = true;
              message.value = 'These credentials do not match our records. Please try with correct email and password.';
            }
        } else {
            // if ANY fail validation
            isLoading.value = false;
            return ;
        }
    };

    return {
      handleLogin,
      error,
      message,
      user,
      submitted,
      v$,
      isLoading
    }
  },
  methods: {
      getImage(image)
      {
          return '/owner/images/' + image;
      },
      
  },
}
</script>

<style scoped>
.logo {
  height: 150px; 
  width: 250px;
  left: -73px;
}
</style>
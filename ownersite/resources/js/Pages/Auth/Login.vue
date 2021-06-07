<template>
    <LoginLayout>

        <jet-validation-errors class="mb-4" />

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>
        
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div class="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
            <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
              Sign In
            </h2>
            <div class="intro-x mt-2 text-gray-500 xl:hidden text-center">
              A few more clicks to sign in to your account. Manage all your
              e-commerce accounts in one place
            </div>
            <form @submit.prevent="submit">
                <div class="intro-x mt-8">
                    <jet-input id="email" 
                                type="email" 
                                class="intro-x login__input form-control py-3 px-4 border-gray-300 block"
                                placeholder="Email"
                                v-model="form.email" 
                                required 
                                autofocus />
                <jet-input id="password" 
                            type="password" 
                            class="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
                            placeholder="Password"
                            v-model="form.password" 
                            required 
                            autocomplete="current-password" />
                </div>
                <div class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4">
                <div class="flex items-center mr-auto">
                    
                    <label class="cursor-pointer select-none">
                        <jet-checkbox name="remember" v-model="form.remember" />
                        <span class="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>
                    <inertia-link v-if="canResetPassword" 
                                    :href="route('password.request')" 
                                    class="underline text-sm text-gray-600 hover:text-gray-900">
                        Forgot your password?
                    </inertia-link>
                </div>
                <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                    <jet-button class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Log in
                    </jet-button>
                </div>
            </form>
          </div>
        </div>
        <!-- END: Login Form -->
    </LoginLayout>
</template>

<script>
    import LoginLayout from '@/Layouts/LoginLayout'
    import JetAuthenticationCard from '@/Jetstream/AuthenticationCard'
    import JetAuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo'
    import JetButton from '@/Jetstream/Button'
    import JetInput from '@/Jetstream/Input'
    import JetCheckbox from '@/Jetstream/Checkbox'
    import JetLabel from '@/Jetstream/Label'
    import JetValidationErrors from '@/Jetstream/ValidationErrors'

    export default {
        components: {
            LoginLayout,
            JetAuthenticationCard,
            JetAuthenticationCardLogo,
            JetButton,
            JetInput,
            JetCheckbox,
            JetLabel,
            JetValidationErrors
        },

        props: {
            canResetPassword: Boolean,
            status: String
        },

        data() {
            return {
                form: this.$inertia.form({
                    email: '',
                    password: '',
                    remember: false
                })
            }
        },

        methods: {
            submit() {
                this.form
                    .transform(data => ({
                        ... data,
                        remember: this.form.remember ? 'on' : ''
                    }))
                    .post(this.route('login'), {
                        onFinish: () => this.form.reset('password'),
                    })
            }
        }
    }
</script>

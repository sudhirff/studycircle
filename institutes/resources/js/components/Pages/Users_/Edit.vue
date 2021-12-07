<template>
    <div>
        <form @submit.prevent = "submitForm" class="validate-form">
            <div class="modal-body">
                <div>
                    <label for="form-name" class="form-label">Name</label>
                    <input id="form-name" 
                            type="text" 
                            class="form-control" 
                            placeholder="Enter full name."
                            v-model="user.name"
                            :class="{ 'border-theme-21': submitted && v$.name.$error }"
                             />
                    <span v-if="submitted && v$.name.$error" class="text-theme-21 mt-2">
                        {{ v$.name.$errors[0].$message }}
                    </span>
                </div>
                
                <div class="mt-3">
                    <label for="form-email" class="form-label">Email</label>
                    <input id="form-email" 
                            type="email" 
                            class="form-control" 
                            placeholder="Enter Email address"
                            v-model="user.email"
                            :class="{ 'border-theme-21': (submitted && (v$.email.$error || v$.email.exists)) }"
                             />
                    <span v-if="submitted && v$.email.$error" class="text-theme-21 mt-2">
                        {{ v$.email.$errors[0].$message }}
                    </span>
                    <span v-if="submitted && v$.email.exists" class="text-theme-21 mt-2">
                        {{ v$.email.exists }}
                    </span>
                </div>
                <div class="mt-3">
                    <label for="form-mobile_no" class="form-label">Mobile No.</label>
                    <input id="form-mobile_no" 
                            type="text" 
                            name="mobile_no"
                            class="form-control" 
                            placeholder="Enter mobile number"
                            v-model="user.mobile_no"
                            :class="{ 'border-theme-21': submitted && v$.mobile_no.$error }"
                             />
                    <span v-if="submitted && v$.mobile_no.$error" class="text-theme-21 mt-2">
                        {{ v$.mobile_no.$errors[0].$message }}
                    </span>
                </div>
                
            </div>
            <!-- BEGIN: Slide Over Footer -->
            <div class="modal-footer text-right w-full absolute bottom-0">
                <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-20 mr-1">
                    Cancel
                </button>
                <button type="submit" class="btn btn-primary w-20">
                    Send
                </button>
            </div>
            <!-- END: Slide Over Footer -->
        </form>
        <!-- BEGIN: Success Notification Content -->
        <div id="success-notification-content"
            class="toastify-content hidden flex"
            >
            <CheckCircleIcon class="text-theme-20" />
            <div class="ml-4 mr-4">
                <div class="font-medium">User is updated successfully!</div>
                <div class="text-gray-600 mt-1">
                    Please check your e-mail for further info!
                </div>
            </div>
        </div>
        <!-- END: Success Notification Content -->
        <!-- BEGIN: Failed Notification Content -->
        <div id="failed-notification-content"
            class="toastify-content hidden flex"
            >
            <XCircleIcon class="text-theme-21" />
            <div class="ml-4 mr-4">
                <div class="font-medium">User is updated failed!</div>
                <div class="text-gray-600 mt-1">
                    Please check the fileld form.
                </div>
            </div>
        </div>
        <!-- END: Failed Notification Content -->
    </div> 
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { reactive, computed } from 'vue'

import useValidate from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs, numeric } from '@vuelidate/validators'
import Toastify from 'toastify-js'

export default {
    props: {
        userId: {
            required: false,
        },
    },
    data() {
        return {
            submitted: false,
            loading: false,
            emailExists: false
        }
    },
    setup(props, {attrs, slots, emit}) {
        
        const user = reactive({
            name: '',
            email: '',
            mobile_no: '',
        })
        const rules = computed(() => {
            return {
                name: {
                    required,
                },
                email: {
                    required,
                    email,
                },
                mobile_no: {
                    required,
                    numeric,
                }
            }
        })

        const v$ = useValidate(rules, user)

        return { user, v$ }
    },
    methods: {
        
        submitForm(e) {
            this.submitted = true;
            this.v$.$validate(); // checks all inputs
            
            if (!this.v$.$error) {
                this.$store.dispatch("checkEmailExists", this.user)
                            .then(response => {
                    if(response.data != "") {
                        this.v$.email.exists = "Entered email address already exists. Please try with another one.";
                        this.emailExists = true; 
                        return false;
                    } else {
                        this.loading = true;
                        this.$store.dispatch('updateUser', this.user);
                        this.submitted = false;
                        cash("#create-user").modal("hide");

                        Toastify({
                            node: cash('#success-notification-content')
                                .clone()
                                .removeClass('hidden')[0],
                            duration: 3000,
                            newWindow: true,
                            close: true,
                            gravity: 'top',
                            position: 'right',
                            stopOnFocus: true
                            }).showToast()
                    }
                }, error => {
                    console.error("Got nothing from server. Prompt user to check internet connection and try again")
                });                
            } else {
                // if ANY fail validation
                Toastify({
                    node: cash('#failed-notification-content')
                        .clone()
                        .removeClass('hidden')[0],
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: 'top',
                        position: 'right',
                        stopOnFocus: true
                        }).showToast()
                return ;
            }
            
        }
    },
    computed: {
        ...mapGetters([
            'users'
        ]),
        user: {
            get () {
                return this.users.find(v => v.id == this.userId)
            },
            set (value) {
                this.$store.commit('updateUser', this.user)
            }
        }
    }
}
</script>


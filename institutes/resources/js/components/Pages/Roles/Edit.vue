<template>
    <ModalBoxCard :divId="`edit-role`"
                    :header = "`Edit Role`"
                    @closeModal="closeModal"
                    >
        <div>
            <form @submit.prevent = "submitForm" class="validate-form">
                <div class="modal-body">
                    <div>
                        <label for="form-name" class="form-label">Name</label>
                        <input id="form-name" 
                                type="text" 
                                class="form-control" 
                                placeholder="Enter name of role."
                                v-model.trim="role.name"
                                :class="{ 'border-theme-21': submitted && v$.name.$error }"
                                />
                        <span v-if="submitted && v$.name.$error" class="text-theme-21 mt-2">
                            {{ v$.name.$errors[0].$message }}
                        </span>
                    </div>
                    
                </div>
                <!-- BEGIN: Slide Over Footer -->
                <div class="modal-footer text-right w-full absolute bottom-0">
                    <button type="button" 
                            data-dismiss="modal" 
                            class="btn btn-outline-secondary w-20 mr-1" 
                            @click="closeModal">
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary w-20">
                        Save
                    </button>
                </div>
                <!-- END: Slide Over Footer -->
            </form>
            <!-- BEGIN: Success Notification Content -->
              <div
                id="success-notification-content"
                class="toastify-content hidden flex"
              >
                <CheckCircleIcon class="text-theme-20" />
                <div class="ml-4 mr-4">
                  <div class="font-medium">Role creation success!</div>
                  <div class="text-gray-600 mt-1">
                    Please check your e-mail for further info!
                  </div>
                </div>
              </div>
              <!-- END: Success Notification Content -->
              <!-- BEGIN: Failed Notification Content -->
              <div
                id="failed-notification-content"
                class="toastify-content hidden flex"
              >
                <XCircleIcon class="text-theme-21" />
                <div class="ml-4 mr-4">
                  <div class="font-medium">Role creation failed!</div>
                  <div class="text-gray-600 mt-1">
                    Please check the fileld form.
                  </div>
                </div>
              </div>
              <!-- END: Failed Notification Content -->
        </div>
    </ModalBoxCard>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed } from 'vue'

import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, maxLength, sameAs, numeric } from '@vuelidate/validators'


import ModalBoxCard from '@/components/UI/BaseModalBoxCard.vue'

import useCreateUpdate from '@/hooks/create_update.js';
export default {
    emits: ['closeComp'],
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    components: {
        ModalBoxCard
    },
    setup(props, context) {
        const store = useStore();
        const submitted = ref(false);
        const emailExists = ref(false);
        const loading = ref(false);

        const role = reactive({
            id: props.item.id,
            name: props.item.name,
            email: props.item.email,
            mobile_no: props.item.mobile_no,
        });

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
                    maxLength: maxLength(10),
                    minLength: minLength(8)
                }
            }
        });

        const v$ = useVuelidate (rules, role);

        const options = {
            modalBoxId: 'edit-role',
            context,
            submitted
        };
        const { closeModal } = useCreateUpdate(options);

        function submitForm() {
            submitted.value = true;
            v$.value.$validate(); // checks all inputs

            if (!v$.value.$error) {
                store.dispatch("roles/checkEmailExists", role).then(response => {
                    if(response.data != "") {
                        v$.value.email.exists = "Entered email address already exists. Please try with another one.";
                        emailExists.value = true; 
                        return false;
                    } else {
                        loading.value = true;
                        store.dispatch('roles/updateRole', role);
                        loading.value = false;
                        submitted.value = false;
                        closeModal();
                    }
                }, error => {
                    console.error("Got nothing from server. Prompt role to check internet connection and try again")
                });                
            } else {
                // if ANY fail validation
                
                return ;
            }
        }

        return {
            submitted,
            role,
            submitForm,
            closeModal,
            loading,
            v$
        }
    },
    methods: {
        
    }
}
</script>
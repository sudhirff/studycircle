<template>
    <ModalBoxCard :divId="`edit-permission`"
                    :header = "`Edit Permission`"
                    @closeModal="closeModal"
                    >
        <div>
            <div class="alert alert-danger show flex items-center mb-2" role="alert" v-if="isErrored">
                <AlertOctagonIcon class="w-6 h-6 mr-2" />
                {{ message }}
            </div>
            <form @submit.prevent = "submitForm" class="validate-form">
                <div class="modal-body">
                    <div>
                        <label for="form-name" class="form-label">Name</label>
                        <input id="form-name" 
                                type="text" 
                                class="form-control" 
                                placeholder="Enter name of permission."
                                v-model.trim="permission.name"
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
                  <div class="font-medium">Permission creation success!</div>
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
                  <div class="font-medium">Permission creation failed!</div>
                  <div class="text-gray-600 mt-1">
                    Please check the fileld form.
                  </div>
                </div>
              </div>
              <!-- END: Failed Notification Content -->
        </div>
        <loading v-if="isLoading" fixed></loading>
    </ModalBoxCard>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed } from 'vue'

import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators'


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

        const isErrored = ref(false);
        const message = ref('');
        const isLoading = ref(false);

        const permission = reactive({
            id: props.item.id,
            name: props.item.name,
        });

        const rules = computed(() => {
            return {
                name: {
                    required,
                },
            }
        });

        const v$ = useVuelidate (rules, permission);

        const options = {
            modalBoxId: 'edit-permission',
            context,
            submitted
        };
        const { closeModal } = useCreateUpdate(options);

        async function submitForm() {
            submitted.value = true;
            v$.value.$validate(); // checks all inputs

            if (!v$.value.$error) {
                try {
                    await store.dispatch('permissions/updatePermission', permission);
                    isLoading.value = false;
                    submitted.value = false;
                    closeModal();
                } catch(e) {
                    isLoading.value = false;
                    isErrored.value = true;
                    message.value = "This name is already taken.";
                }              
            } else {
                // if ANY fail validation
                
                return ;
            }
        }

        return {
            submitted,
            permission,
            submitForm,
            closeModal,
            isLoading,
            isErrored,
            message,
            v$
        }
    },
    methods: {
        
    }
}
</script>
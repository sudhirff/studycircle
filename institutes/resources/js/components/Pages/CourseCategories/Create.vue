<template>
    <div class="col-span-12 lg:col-span-4">
                
        <div class="intro-y box p-5">
            <div class="py-4"><h2 class="text-lg font-medium mr-auto">Add New</h2></div>
            <form @submit.prevent="saveCategory">
                <div>
                    <label class="form-label" for="form-name">Name</label>
                    <input id="form-name" 
                            type="text" 
                            class="form-control" 
                            placeholder="Enter category name of course."
                            v-model.trim="courseCategory.name"
                            :class="{ 'border-theme-24': submitted && v$.name.$error }"
                            />
                    <span v-if="submitted && v$.name.$error" class="text-theme-24 mt-2">
                        {{ v$.name.$errors[0].$message }}
                    </span>
                </div>
                <div class="text-right mt-5">
                    <button type="button" class="btn btn-outline-secondary w-24 mr-1"> Reset </button>
                    <button type="submit" class="btn btn-primary w-24">Save</button>
                </div>
            </form>
        </div>
    </div>
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
            name: '',
        });

        const rules = computed(() => {
            return {
                name: {
                    required: helpers.withMessage('Please enter name of perimission.', required),
                },
            }
        });

        const v$ = useVuelidate (rules, permission);

        const options = {
            modalBoxId: 'create-permission',
            context,
            submitted
        };
        const { closeModal } = useCreateUpdate(options);

        async function submitForm() {
            submitted.value = true;
            v$.value.$validate(); // checks all inputs

            if (!v$.value.$error) {
                isLoading.value = true;
                try {
                    await store.dispatch('permissions/createPermission', permission);
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

<style>

</style>
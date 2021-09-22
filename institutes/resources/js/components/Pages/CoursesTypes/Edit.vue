<template>
    <div class="intro-y box lg:mt-5">
        <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
        >
            <h2 class="font-medium text-base mr-auto">{{ $t('coursetypes.Edit Course Type')}}</h2>
        </div>
        <div class="p-5">
            <div class="flex flex-col-reverse xl:flex-row flex-col">
                <div class="flex-1 mt-6 xl:mt-0">
                    <form @submit.prevent="submit">
                        <div class="grid grid-cols-12 gap-x-5">
                            <div class="col-span-12 xxl:col-span-6">
                                <div>
                                    <label for="update-profile-form-1" class="form-label"
                                        >Label</label
                                    >
                                    <input
                                        id="update-profile-form-1"
                                        type="text"
                                        class="form-control"
                                        placeholder="Label of course type"
                                        v-model.trim="courseType.label"
                                        :class="{ 'border-theme-24': submitted && v$.label.$error }"
                                    />
                                    <span v-if="submitted && v$.label.$error" class="text-theme-24 mt-2">
                                        {{ v$.label.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-span-12 xxl:col-span-6">
                                
                                <div class="mt-3">
                                    <label for="update-profile-form-4" class="form-label"
                                        >Description</label
                                    >
                                    <input
                                        id="update-profile-form-4"
                                        type="text"
                                        class="form-control"
                                        placeholder="Course type description"
                                        v-model.trim="courseType.description"
                                        :class="{ 'border-theme-24': submitted && v$.description.$error }"
                                    />
                                    <span v-if="submitted && v$.description.$error" class="text-theme-24 mt-2">
                                        {{ v$.description.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-span-12 xxl:col-span-6">
                                
                                <div class="mt-3">
                                    <label for="courses-tags" class="form-label"
                                        >Icon</label
                                    >
                                    <input
                                        id="update-profile-form-4"
                                        type="text"
                                        class="form-control"
                                        placeholder="Course type icon"
                                        v-model="courseType.icon"
                                    />
                                </div>
                            </div>
                            
                        </div>
                        <div class="text-right mt-5">
                            <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click="toggleCreate"> Cancel </button>
                            <button type="submit" class="btn btn-primary w-24">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed } from "vue";

import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators'
import { useRoute, useRouter } from 'vue-router'

export default {
    emits: ['changeComponent'],
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    setup(props, context) {
        
        const store = useStore();
        const submitted = ref(false);

        const isErrored = ref(false);
        const message = ref('');
        const isLoading = ref(false);
        const router = useRouter();
        
        const courseType = reactive({
            id: props.item.id,
            label: JSON.parse(props.item.label),
            description: JSON.parse(props.item.description),
            icon: props.item.icon,
        });

        const rules = computed(() => {
            return {
                label: {
                    required: helpers.withMessage('Please enter label of course type.', required),
                },
                description: {
                    required: helpers.withMessage('Please enter description of course type.', required),
                },
            }
        });

        const v$ = useVuelidate (rules, courseType);

        async function submit() {
            submitted.value = true;

            v$.value.$validate(); // checks all inputs

            if (!v$.value.$error) {
                isLoading.value = true;
                try {
                    await store.dispatch('coursesType/update', courseType);
                    isLoading.value = false;
                    submitted.value = false;
                    toggleCreate();
                    //clearForm();
                   //router.push('/course-types');
                    
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

        function clearForm() {
            courseType.label = "";
            courseType.description = "";
            courseType.icon = "";
        }
        function toggleCreate() {
            context.emit('changeComponent')
        }
        return {
            courseType,
            submitted,
            isLoading,
            submit,
            v$,
            toggleCreate
        }
    },
    methods: {
        
    },
    
}
</script>

<style>

</style>
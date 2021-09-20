<template>
    <div>
        <div class="intro-y flex items-center mt-8">
            <h2 class="text-lg font-medium mr-auto">{{ $tc('Courses Types') }}</h2>
        </div>
        <div class="grid grid-cols-12 gap-6">
            <!-- BEGIN: Profile Menu -->
            <div
                class="col-span-12 lg:col-span-8 xxl:col-span-3 flex lg:block flex-col-reverse"
            >
                <div class="intro-y box mt-5">
                    <div class="relative flex items-center p-5">
                         <the-base-data-list-card>
                            <the-base-crud-table>
                                <thead>
                                    <base-row-card :columns="columns" :showHeaders="true"></base-row-card>
                                </thead>
                                <tbody>
                                    <base-row-card v-for="(item, index) in items" 
                                                    :key="index" 
                                                    :columns="columns"
                                                    :item="item"
                                                    @EditRow="showEditModal"
                                                    @DeleteRow="showDeleteModal"
                                                    ></base-row-card>
                                </tbody>
                            </the-base-crud-table>
                        </the-base-data-list-card>
                    </div>
                </div>
            </div>
            <!-- END: Profile Menu -->
            <div class="col-span-12 lg:col-span-4 xxl:col-span-9">
                <!-- BEGIN: Display Information -->
                <div class="intro-y box lg:mt-5">
                    <div
                        class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
                    >
                        <h2 class="font-medium text-base mr-auto">Add Course Type</h2>
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
                                        <button type="button" class="btn btn-outline-secondary w-24 mr-1"> Cancel </button>
                                        <button type="submit" class="btn btn-primary w-24">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END: Display Information -->
            
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed } from "vue";

import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators'

import useListing from '@/hooks/listing.js';
import BaseDeleteModalCard from '@/components/UI/BaseDeleteModalCard.vue';

export default {
    components: {
        BaseDeleteModalCard
    },
    setup(props, context) {
        const store = useStore();
        const submitted = ref(false);

        const isErrored = ref(false);
        const message = ref('');
        const isLoading = ref(false);
        
        const columns = {
            id: {
                label: "ID",
                sorting: true,
            },
            label: {
                label: "LABEL",
                sorting: true,
            },
            actions: {
                label:"ACTIONS",
                sorting: false,
            }
        };

        const options = {
            listDispatch: 'coursesType/fetch',
            listGetter: 'coursesType/coursesType',
            deleteDispatch: 'courseTypes/deletePermission',
            deleteComponentName: 'BaseDeleteModalCard',
            moduleName: "Courses Types"
        };
        
        const {
            _,
            items,
            selectedComponent,
            deleteItem,
            openModal,
            removeComponent,
            selectedItem
         } = useListing(options);

        const courseType = reactive({
            label: '',
            description: '',
            icon: '',
        });

        console.log(items);
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
                    await store.dispatch('coursesType/create', courseType);
                    isLoading.value = false;
                    submitted.value = false;
                    alert('Course type created successfully.');
                    clearForm();
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

        return {
            courseType,
            submit,
            isLoading,
            submitted,
            v$,            
            columns,
            options,
            items,
            selectedComponent,
            deleteItem,
            openModal,
            removeComponent,
            selectedItem,
            moduleName: options.moduleName
        }
    }
}
</script>

<style>

</style>
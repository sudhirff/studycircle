<template>
    <div>
        <div class="intro-y flex items-center mt-8">
            <h2 class="text-lg font-medium mr-auto">Courses</h2>
        </div>
        <div class="grid grid-cols-12 gap-6">
            <!-- BEGIN: Profile Menu -->
            <div
                class="col-span-12 lg:col-span-8 xxl:col-span-3 flex lg:block flex-col-reverse"
            >
                <div class="intro-y box mt-5">
                    <div class="relative flex items-center p-5">
                                
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
                        <h2 class="font-medium text-base mr-auto">Add Course</h2>
                    </div>
                    <div class="p-5">
                        <div class="flex flex-col-reverse xl:flex-row flex-col">
                            <div class="flex-1 mt-6 xl:mt-0">
                                <div class="grid grid-cols-12 gap-x-5">
                                    <div class="col-span-12 xxl:col-span-6">
                                        <div>
                                        <label for="update-profile-form-1" class="form-label"
                                            >Name</label
                                        >
                                        <input
                                            id="update-profile-form-1"
                                            type="text"
                                            class="form-control"
                                            placeholder="Input text"
                                            :class="{ 'border-theme-24': submitted && v$.name.$error }"
                                        />
                                        </div>
                                    </div>
                                    <div class="col-span-12 xxl:col-span-6">
                                        
                                        <div class="mt-3">
                                            <label for="update-profile-form-4" class="form-label"
                                                >Course Code</label
                                            >
                                            <input
                                                id="update-profile-form-4"
                                                type="text"
                                                class="form-control"
                                                placeholder="Course code"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-span-12 xxl:col-span-6">
                                        
                                        <div class="mt-3">
                                            <label for="courses-tags" class="form-label"
                                                >Tags</label
                                            >
                                            <tag v-model="tags"  
                                                :inputId="'courses-tags'" 
                                                :options="['Hello', 'World']"
                                                :allowCustom="true"
                                                :showCount="true" />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="text-right mt-5">
                                    <button type="button" class="btn btn-outline-secondary w-24 mr-1"> Cancel </button>
                                    <button type="button" class="btn btn-primary w-24">Save</button>
                                </div>
                                
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
import { ref, reactive, computed } from 'vue'

import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators'

import useListing from '@/hooks/listing.js';

import CreateCourse from '@/components/Pages/CourseCategories/Create.vue';
import BaseDeleteModalCard from '@/components/UI/BaseDeleteModalCard.vue';

import Tag from '@/components/inputs/Tag.vue'

export default {
    components: {
        CreateCourse,
        BaseDeleteModalCard,
        Tag,
    },
    data() {
        return {
            tags: [],
        };
    },
    setup(){
        const store = useStore();
        const submitted = ref(false);

        const isErrored = ref(false);
        const message = ref('');
        const isLoading = ref(false);

        const courseCategory = reactive({
            name: '',
            course_code: '',
            tags: '',
        });

        const rules = computed(() => {
            return {
                name: {
                    required: helpers.withMessage('Please enter name of course category.', required),
                },
            }
        });

        const v$ = useVuelidate (rules, courseCategory);

        const columns = {
            id: {
                label: "ID",
                sorting: true,
            },
            name: {
                label: "NAME",
                sorting: true,
            },
            actions: {
                label:"ACTIONS",
                sorting: false,
            }
        };

        

        const options = {
            listGetter: 'courseCategories/courseCategories',
            listDispatch: 'courseCategories/fetchCourseCategories',
            editModalFormId: 'edit-permission',
            editComponentName: 'EditPermission',
            editGetter: 'permissions/editPermission',
            editDispatch: 'permissions/editPermission',
            deleteDispatch: 'permissions/deletePermission',
            deleteComponentName: 'BaseDeleteModalCard',
        };
        
        const {
            isLoadingCh,
            items,
            selectedComponent,
            deleteItem,
            openModal,
            removeComponent,
            selectedItem
         } = useListing(options);

        async function saveCategory() {
            submitted.value = true;

            v$.value.$validate(); // checks all inputs

            if (!v$.value.$error) {
                isLoading.value = true;
                try {
                    await store.dispatch('courseCategories/create', courseCategory);
                    isLoading.value = false;
                    submitted.value = false;
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
            courseCategory,
            isLoading,
            isErrored,
            message,
            v$,
            items,
            saveCategory,
            submitted,
        };
    },
    methods: {
        
    },
}
</script>

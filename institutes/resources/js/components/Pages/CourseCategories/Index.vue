<template>
    <div>
        <the-page-header :title="'Course Categories'"></the-page-header>
        <the-base-card>
            <the-base-header-card>
                <the-add-new-button>
                    <a href="javascript:;" 
                        @click.prevent="selectedComponent(options.createComponentName)"
                        class="btn btn-primary"
                        >
                        Add New Parent Course Category
                    </a>
                </the-add-new-button>
                <div class="hidden md:block mx-auto text-gray-600">
                    
                </div>
                <base-search-card></base-search-card>
            </the-base-header-card>
            <component v-if="selectedComponent !== null" 
                        :is="selectedComponent"
                        @closeComp="removeComponent"
                        @deleteConfirm="deleteItem"
                        :moduleName="moduleName"
                        ></component>
            <the-base-data-list-card class="post intro-y overflow-hidden box p-5">
                <tree-row-card :items="items"></tree-row-card>
            </the-base-data-list-card>

        </the-base-card>
       
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

import TreeRowCard from '@/components/UI/TreeRowCard.vue';
import Create from './Create.vue';


export default {
    components: {
        CreateCourse,
        BaseDeleteModalCard,
        TreeRowCard,
    },
    setup(){
        const store = useStore();
        const submitted = ref(false);

        const isErrored = ref(false);
        const message = ref('');
        const isLoading = ref(false);


        const courseCategory = reactive({
            name: '',
            parent_id: '',
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

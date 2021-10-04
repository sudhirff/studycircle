<template>
    <div>
        <div class="intro-y flex items-center mt-8">
            <h2 class="text-lg font-medium mr-auto">{{ $tc('Courses') }}</h2>
            <base-search-card @search="search"></base-search-card>
        </div>
        <div class="grid grid-cols-12 gap-6">
            <!-- BEGIN: Profile Menu -->
            <div
                class="col-span-12 lg:col-span-8 xxl:col-span-3 flex lg:block flex-col-reverse"
            >
                <div class="intro-y box mt-5">
                    <div class="relative flex items-center p-5">
                        <the-base-data-list-card class="course-table-div">
                            <the-base-crud-table>
                                <thead>
                                    <base-row-card :columns="columns" 
                                                    :showHeaders="true" 
                                                    @sorting="sort"
                                                    :field="sortField"
                                                    :direction="sortDirection"
                                                    ></base-row-card>
                                </thead>
                                <tbody id="listing" v-if="!items">
                                    <tr>
                                        <td colspan="5" class="text-center">{{ $t('Sorry, no records found!')}}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                                                            
                                    <tr v-for="(item, index) in items.data" 
                                                    :key="index" 
                                                    :id="'list-'+item.id"
                                                    >
                                        <td class="border-b whitespace-nowrap">{{ item.id }}</td>
                                        <td class="border-b whitespace-nowrap">{{ item.course_code }}</td>
                                        <td class="border-b whitespace-nowrap">{{ item.name }}</td>
                                        <td class="border-b whitespace-nowrap">{{ item.tags }}</td>
                                        <td class="border-b whitespace-nowrap">
                                            <div class="flex justify-center items-center">
                                                <a href="#"
                                                    @click.prevent="editItem(item)" 
                                                    class="flex items-center mr-3"
                                                    >
                                                    <CheckSquareIcon class="w-4 h-4 mr-1" /> {{ $t('Edit')}}
                                                </a>
                                                <a class="flex items-center text-theme-24" 
                                                    href="#" 
                                                    data-toggle="modal" 
                                                    @click.prevent="removeItem(item)"
                                                    > 
                                                    <Trash2Icon class="w-4 h-4 mr-1" /> {{ $t('Delete')}}
                                                </a>
                                            </div>
                                        </td>       
                                    </tr>
                                </tbody>
                            </the-base-crud-table>
                        </the-base-data-list-card>
                    </div>
                </div>
                <pagination align="center" v-if="showPagination && items" :data="items" @pagination="paginate"></pagination>
            </div>
            <!-- END: Profile Menu -->
            <div class="pos col-span-12 lg:col-span-4 xxl:col-span-9">
                <!-- BEGIN: Display Information -->
                <div class="post intro-y box lg:mt-5">
                    
                    <div
                        class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
                    >
                        <h2 class="font-medium text-base mr-auto">{{ $t('Add Course') }}</h2>
                    </div>
                    <div class="p-5">
                        <div class="flex flex-col-reverse xl:flex-row flex-col">
                            <div class="flex-1 mt-6 xl:mt-0">
                                <form @submit.prevent="submit">
                                    <div class="grid grid-cols-12 gap-x-5">
                                        <div class="col-span-12 xxl:col-span-6">
                                            <div>
                                                <label for="update-profile-form-1" class="form-label"
                                                    >{{ $t('Choose course type')}}</label
                                                >
                                                <TailSelect
                                                    v-model="course.course_type"
                                                    :options="{
                                                        search: true,
                                                        hideSelected: true,
                                                        hideDisabled: true,
                                                        multiLimit: 5,
                                                        multiShowCount: false,
                                                        multiContainer: true,
                                                        classNames: 'w-full'
                                                    }"
                                                    multiple
                                                >
                                                    <option value="">Select a course type</option>
                                                    <option v-for="(courseType, index) in courseTypes" 
                                                            :key="index" 
                                                            :value="index">{{ JSON.parse(courseType) }}</option>
                                                </TailSelect>
                                            </div>
                                        </div>
                                        <div class="col-span-12 xxl:col-span-6">
                                            <div>
                                            <label for="course-name" class="form-label"
                                                >{{ $t('Name') }}</label
                                            >
                                            <input
                                                id="course-name"
                                                type="text"
                                                v-model="course.name"
                                                class="form-control"
                                                placeholder="Name of course"
                                                :class="{ 'border-theme-24': submitted && v$.name.$error }"
                                            />
                                            </div>
                                        </div>
                                        <div class="col-span-12 xxl:col-span-6">
                                            
                                            <div class="mt-3">
                                                <label for="update-profile-form-4" class="form-label"
                                                    >{{ $t('Course code') }}</label
                                                >
                                                <input
                                                    id="update-profile-form-4"
                                                    type="text"
                                                    v-model="course.course_code"
                                                    class="form-control"
                                                    placeholder="Course code"
                                                    :class="{ 'border-theme-24': submitted && v$.course_code.$error }"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-span-12 xxl:col-span-6">
                                            <div>
                                                <label for="language" class="form-label"
                                                    >{{ $t('Language')}}</label
                                                >
                                                <TailSelect
                                                    id="language"
                                                    v-model="course.language_id"
                                                    :options="{
                                                        search: true,
                                                        classNames: 'w-full'
                                                    }"
                                                >
                                                {{ languages}}
                                                    <option v-for="(language, index) in languages" 
                                                            :key="index" 
                                                            :value="index">{{ language}}</option>
                                                    
                                                </TailSelect>
                                            </div>
                                        </div>
                                        <div class="col-span-12 xxl:col-span-6">
                                            
                                            <div class="mt-3">
                                                <label for="courses-tags" class="form-label">{{ $t('Tags') }}</label>

                                                <tag v-model="course.tags" 
                                                    :inputId="'courses-tags'"
                                                    :allowCustom="true"
                                                    :showCount="true" />
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-right mt-5">
                                        <button type="button" class="btn btn-outline-secondary w-24 mr-1"> Cancel </button>
                                        <button type="submit" class="btn btn-primary w-24 ml-5">Save</button>
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
import { ref, reactive, computed, onMounted } from 'vue'

import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators'

import BaseDeleteModalCard from '@/components/UI/BaseDeleteModalCard.vue';

import Tag from '@/components/inputs/Tag.vue';

export default {
    components: {
        BaseDeleteModalCard,
        Tag,
    },
    setup(){
        const store = useStore();
        const submitted = ref(false);

        const isErrored = ref(false);
        const message = ref('');
        const isLoading = ref(false);
        const selectedItem = ref();
        const showDelete = ref(false);
        const editMode = ref(false);
        
        const select = ref(0);

        const params = reactive({
            page: 0,
            keyword: '',
            sort: 'desc',
            field: 'id',
        });

        const columns = {
            id: {
                label: "ID",
                sorting: true,
            },
            course_code: {
                label: "COURSE CODE",
                sorting: false,
            },
            name: {
                label: "NAME",
                sorting: true,
            },
            tags: {
                label: "TAGS",
                sorting: false,
            },
            actions: {
                label:"ACTIONS",
                sorting: false,
            }
        };

        // Here we will fetch all the listing.
        //
        onMounted(() => {
            loadItems();
        })
        async function loadItems() {
            isLoading.value = true;
            try {
                await store.dispatch('courses/fetch', params);
                isLoading.value = false;
            } catch (error) {
                error = error.message || 'Something went wrong!';
            }
            isLoading.value = false;
        }

        // After items are fetched, we have to get all the items using gettters
        const items = computed(function () {
            const getItems = store.getters['courses/courses'];
            if (getItems.data !== undefined) {
                if (getItems.data.length > 0)
                return getItems;
            }
            return false;
        });

        // After items are fetched, we have to get all the course types using gettters
        const courseTypes = computed(function () {
            return store.getters['courses/courseTypes'];
        });

        const languages = computed(function() {
            return store.getters['courses/languages'];
        });

        const course = reactive({
            id: '',
            course_type: '',
            name: '',
            course_code: '',
            tags: [],
            language_id: 1,
        });

        const rules = computed(() => {
            return {
                name: {
                    required: helpers.withMessage('Please enter name of course.', required),
                },
                course_code: {
                    required: helpers.withMessage('Please enter course_code of course.', required),
                },
                tags: {
                    required: helpers.withMessage('Please enter/select tag(s).', required),
                },
            }
        });

        const v$ = useVuelidate (rules, course);

        async function submit() {
            submitted.value = true;

            v$.value.$validate(); // checks all inputs

            if (!v$.value.$error) {
                isLoading.value = true;
                try {
                    if (editMode.value === true) {
                        await store.dispatch('courses/update', course);
                        message.value = "Course type updated successfully.";
                    } else {
                        await store.dispatch('courses/create', course);
                        message.value = "Course type created successfully.";
                    }

                    isLoading.value = false;
                    submitted.value = false;
                    //alert(message.value);
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
            editMode.value = false;
            var elements = document.getElementsByClassName('bg-gray-200');
            while(elements.length > 0){
                elements[0].classList.remove('bg-gray-200');
            }
            courseType.id = "";
            courseType.label = "";
            courseType.description = "";
            courseType.icon = "";
        }

        function editItem(item) {
            var elements = document.getElementsByClassName('bg-gray-200');
            while(elements.length > 0){
                elements[0].classList.remove('bg-gray-200');
            }
            document.getElementById('list-'+item.id).className = "bg-gray-200";
            
            editMode.value = true;
            courseType.id = item.id;
            courseType.label = JSON.parse(item.label);
            courseType.description = JSON.parse(item.description);
            courseType.icon = item.icon;
        }
        
        function removeItem(item) {
            showDelete.value = true;
            selectedItem.value = item.id;
        }

        function paginate(page) {
            params.page = page;
            loadItems();
        }

        function search(srchTxt) {
            params.page = 0,
            params.keyword = srchTxt;
            loadItems();
        }

        function sort(sortArray) {
            params.field = sortArray[0];
            params.sort = sortArray[1];
            loadItems();
        }
        return {
            isLoading,
            columns,
            items,
            selectedItem,
            editItem,
            removeItem,
            showDelete,
            course,
            submitted,
            submit,
            v$,
            editMode,
            clearForm,
            loadItems,
            paginate,
            search,
            sort,
            sortField: params.field,
            sortDirection: params.sort,
            moduleName: "Course Type",
            select,
            courseTypes,
            languages,
        }
    },
    computed: {
        showPagination() {
            if (this.items.total / this.items.to > 1 || this.items.current_page != 1) {
                return true;
            }
            return false;
        },
    },
    methods: {
    },
}
</script>
<style scoped>
.course-table-div {
    width: 100%;
}
.active-row {
    background-color: chartreuse;
}
</style>
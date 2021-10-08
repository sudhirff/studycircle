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
                                    <tr v-for="(item, index) in result" 
                                                    :key="index" 
                                                    :id="'list-'+item.id"
                                                    >
                                        <td class="border-b whitespace-nowrap">{{ item.id }}</td>
                                        <td class="border-b whitespace-nowrap">{{ item.course_code }}</td>
                                        <td class="border-b whitespace">{{ item.name }}</td>
                                        <td class="border-b whitespace">{{ item.tags.toString() }}
                                            
                                            
                                        </td>
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
                        <h2 class="font-medium text-base mr-auto">{{ editMode? $t('course.Edit Course'): $t('course.Add Course')}}</h2>
                    </div>
                    <div class="p-5">
                        <div class="flex flex-col-reverse xl:flex-row flex-col">
                            <div class="flex-1 mt-6 xl:mt-0">
                                <div class="alert alert-danger show flex items-center mb-2" role="alert" v-if="isErrored">
                                    <AlertOctagonIcon class="w-6 h-6 mr-2" />
                                    {{ message }}
                                </div>
                                <form @submit.prevent="submitForm">
                                    <div class="grid grid-cols-12 gap-x-5">
                                        <div class="col-span-12 xxl:col-span-6">
                                            <div class="mt-3 ">
                                                <label for="update-profile-form-1" class="form-label"
                                                    >{{ $t('Choose course type')}}</label
                                                >
                                                <TailSelect
                                                    v-model="form.type_ids"
                                                    :options="{
                                                        search: true,
                                                        hideSelected: false,
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
                                            <div class="mt-3 ">
                                                <label for="course-name" class="form-label"
                                                    >{{ $t('Name') }}</label
                                                >
                                                <input
                                                    id="course-name"
                                                    type="text"
                                                    v-model="form.name"
                                                    class="form-control"
                                                    placeholder="Name of course"
                                                    :class="{ 'border-theme-24': submitted && v$.name.$error }"
                                                />
                                                <span v-if="submitted && v$.name.$error" class="text-theme-24 mt-2">
                                                    {{ v$.name.$errors[0].$message }}
                                                </span>
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
                                                    v-model="form.course_code"
                                                    class="form-control"
                                                    placeholder="Course code"
                                                    :class="{ 'border-theme-24': submitted && v$.course_code.$error }"
                                                />
                                                
                                                <span v-if="submitted && v$.course_code.$error" class="text-theme-24 mt-2">
                                                    {{ v$.course_code.$errors[0].$message }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-span-12 xxl:col-span-6">
                                            <div class="mt-3 ">
                                                <label for="language" class="form-label"
                                                    >{{ $t('Language or Medium')}}</label
                                                >
                                                <TailSelect
                                                    id="language"
                                                    v-model="form.language_id"
                                                    :options="{
                                                        search: true,
                                                        classNames: 'w-full'
                                                    }"
                                                >
                                                    <option v-for="(language, index) in languages" 
                                                            :key="index" 
                                                            :value="index">{{ language}}</option>
                                                    
                                                </TailSelect>
                                            </div>
                                        </div>
                                        <div class="col-span-12 xxl:col-span-6">
                                            
                                            <div class="mt-3">
                                                <label for="courses-tags" class="form-label">{{ $t('Tags') }}</label>

                                                <tag v-model="form.tags" 
                                                    :inputId="'courses-tags'"
                                                    :allowCustom="true"
                                                    :showCount="true"
                                                    :class="{ 'border-theme-24': submitted && v$.tags.$error }"
                                                    />
                                                <span v-if="submitted && v$.tags.$error" class="text-theme-24 mt-2">
                                                    {{ v$.tags.$errors[0].$message }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-right mt-5">
                                        <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click.prevent="clearForm"> Cancel </button>
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
        <loading v-if="isLoading" fixed></loading>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed, onMounted } from 'vue'
import { required, helpers } from '@vuelidate/validators'

import BaseDeleteModalCard from '@/components/UI/BaseDeleteModalCard.vue';

import Tag from '@/components/inputs/Tag.vue';

import useCrud from '@/hooks/crud.js'

export default {
    components: {
        BaseDeleteModalCard,
        Tag,
    },

    setup(){
        const store = useStore();
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
        const form = reactive({
            id: '',
            type_ids: [],
            name: '',
            course_code: '',
            tags: [],
            language_id: 1,
        });
        const initialState = {
            id: '',
            type_ids: [],
            name: '',
            course_code: '',
            tags: [],
            language_id: 1,
        };
        const rules = computed(() => {
            return {
                name: {
                    required: helpers.withMessage('Please enter name of course.', required),
                },
                course_code: {
                    required: helpers.withMessage('Please enter course code of course.', required),
                },
                tags: {
                    required: helpers.withMessage('Please enter/select tag(s).', required),
                },
            }
        });
        
        const options = {
            fetch: 'courses/fetch',
            getters: 'courses/courses',
            initialState,
            form,
            rules,
            create: 'courses/create',
            update: 'courses/update',
            delete: 'courses/delete',
            moduleName: 'Course(s)'
        }
        const { 
            items, 
            fetch, 
            paginate, 
            search, 
            sort, 
            params, 
            isLoading, 
            submitted, 
            submit, 
            v$, 
            isErrored, 
            message, 
            editItem, 
            editMode, 
            clearForm, 
            removeItem } = useCrud(options);

        onMounted(fetch);

        // After items are fetched, we have to get all the course types using gettters
        const courseTypes = computed(function () {
            return store.getters['courses/courseTypes'];
        });

        const languages = computed(function() {
            return store.getters['courses/languages'];
        });

        const submitForm = async() => {
            try {
                await submit();
                form.id = '',
                form.type_ids = [],
                form.name = '',
                form.course_code = '',
                form.tags = [],
                form.language_id = 1,
                fetch();
            } catch (e) {

            }

        }
        return {
            isLoading,
            columns,
            items,
            search,
            paginate, 
            sort,
            sortField: params.field,
            sortDirection: params.sort,
            editMode,
            courseTypes,
            languages,
            form,
            submitted,
            submit,
            v$,
            isErrored,
            message,
            editItem,
            clearForm,
            removeItem,
            submitForm
        }
    },
    computed: {
        showPagination() {
            if (this.items.total / this.items.to > 1 || this.items.current_page != 1) {
                return true;
            }
            return false;
        },

        result() {
            return this.items.data.map((item) => {
                let types = [];
                if (item.courses_types !==undefined) {
                    types = item.courses_types.map((type) => {
                        if (type) {
                            return type.id 
                        } else {
                            return []
                        }
                    });
                }
                return {
                    id: item.id,
                    name: item.name,
                    type_ids: types,
                    course_code: item.course_code,
                    language_id: item.language_id,
                    tags: item.tagged.map((tag) => { return tag.tag_name}),
                };
            });
        }
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
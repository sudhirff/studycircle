<template>
    <div>
        <template v-if="!view">
            <div class="intro-y flex items-center mt-8">
                <h2 class="text-lg font-medium mr-auto">{{ $tc('Subjects') }}</h2>
                <base-search-card @search="search"></base-search-card>
            </div>
            
            <div class="grid grid-cols-12 gap-6">
                <!-- BEGIN: Profile Menu -->
                <div
                    class="col-span-12 lg:col-span-8 xxl:col-span-3 flex lg:block flex-col-reverse"
                >
                    <div class="intro-y box mt-5">
                        <div class="relative flex items-center p-5">
                            <the-base-data-list-card class="subject-table-div">
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
                                            <td :colspan="Object.keys(columns).length" class="text-center">{{ $t('Sorry, no records found!')}}</td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                                                                
                                        <tr v-for="(item, index) in result" 
                                                        :key="index" 
                                                        :id="'list-'+item.id"
                                                        >
                                            <td class="border-b whitespace-nowrap">{{ item.id }}</td>
                                            <td class="border-b whitespace-nowrap">{{ item.icon }}</td>
                                            <td class="border-b whitespace">{{ item.label }}</td>
                                            <td class="border-b whitespace">{{ item.tags.toString() }}
                                                <!--<span v-for="(tag, index) in item.tagged" :key="index" class="text-xs px-1 rounded-full bg-theme-17 text-white mr-1">
                                                    #{{ tag.tag.name }}
                                                </span>-->
                                                
                                            </td>
                                            <td class="border-b whitespace-nowrap">
                                                <div class="flex justify-center items-center">
                                                    <a href="#"
                                                        @click.prevent="editItem(item)" 
                                                        class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2  rounded-md "
                                                        >
                                                        <CheckSquareIcon class="w-4 h-4 mr-1" /> {{ $t('Edit')}}
                                                    </a>
                                                    <a class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2  rounded-md text-theme-24" 
                                                            href="#" 
                                                            @click.prevent="removeItem(item)"
                                                            > 
                                                        <Trash2Icon class="w-4 h-4 mr-1" /> {{ $t('Delete')}}
                                                    </a>
                                                    <router-link :to="{ name: 'subjectView', params: { id: item.id } }"
                                                                @click.prevent="view = !view"
                                                                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2  rounded-md" >
                                                        <EyeIcon class="w-4 h-4 mr-1" /> {{item.id}}{{ $t('View')}}
                                                    </router-link>
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
                            <h2 class="font-medium text-base mr-auto">{{ editMode? $t('subject.Edit Subject'): $t('subject.Add Subject')}}</h2>
                        </div>
                        <div class="p-5">
                            <div class="flex flex-col-reverse xl:flex-row flex-col">
                                <div class="flex-1 mt-6 xl:mt-0">
                                    <form @submit.prevent="submitForm">
                                        <div class="grid grid-cols-12 gap-x-5">
                                            <div class="col-span-12 xxl:col-span-6">
                                                <div class="mt-3 ">
                                                    <label for="update-profile-form-1" class="form-label"
                                                        >{{ $t('Choose course')}}</label
                                                    >
                                                    <TailSelect
                                                        v-model="form.course_ids"
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
                                                        <option value="">Select a course</option>
                                                        
                                                        <option v-for="(course, index) in courses" 
                                                                :key="random(index)"
                                                                :value="index">{{ course }}</option>
                                                    </TailSelect>
                                                </div>
                                            </div>
                                            <div class="col-span-12 xxl:col-span-6">
                                                <div class="mt-3 ">
                                                    <label for="subject-label" class="form-label"
                                                        >{{ $t('Label') }}</label
                                                    >
                                                    <input
                                                        id="subject-label"
                                                        type="text"
                                                        v-model="form.label"
                                                        class="form-control"
                                                        placeholder="Subject Label"
                                                        :class="{ 'border-theme-24': submitted && v$.label.$error }"
                                                    />
                                                    <span v-if="submitted && v$.label.$error" class="text-theme-24 mt-2">
                                                        {{ v$.label.$errors[0].$message }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-span-12 xxl:col-span-6">
                                                
                                                <div class="mt-3">
                                                    <label for="subject-description" class="form-label"
                                                        >{{ $t('Description') }}</label
                                                    >
                                                    <textarea 
                                                        id="subject-description"
                                                        v-model="form.description"
                                                        class="form-control"
                                                        placeholder="Description"
                                                        :class="{ 'border-theme-24': submitted && v$.description.$error }"></textarea>
                                                    
                                                    <span v-if="submitted && v$.description.$error" class="text-theme-24 mt-2">
                                                        {{ v$.description.$errors[0].$message }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-span-12 xxl:col-span-6">
                                                
                                                <div class="mt-3">
                                                    <label for="subject-icon" class="form-label"
                                                        >{{ $t('Icon') }}</label
                                                    >
                                                    <input 
                                                        type="text"
                                                        id="subject-icon"
                                                        v-model="form.icon"
                                                        class="form-control"
                                                        placeholder="Icon"
                                                        :class="{ 'border-theme-24': submitted && v$.icon.$error }" />
                                                    <span v-if="submitted && v$.icon.$error" class="text-theme-24 mt-2">
                                                        {{ v$.icon.$errors[0].$message }}
                                                    </span>
                                                    
                                                </div>
                                            </div>
                                            <div class="col-span-12 xxl:col-span-6">
                                                <div class="mt-3 ">
                                                    <label for="subject-language" class="form-label"
                                                        >{{ $t('Language or Medium')}}</label
                                                    >
                                                    <TailSelect
                                                        id="subject-language"
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
                                                    <label for="subject-tags" class="form-label">{{ $t('Tags') }}</label>

                                                    <tag v-model="form.tags" 
                                                        :inputId="'subject-tags'"
                                                        :allowCustom="true"
                                                        :showCount="true" />
                                                    
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
        </template>
        <template v-else>
            <router-view></router-view>
        </template>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
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
        const view = ref(false);
        const route = useRoute();
        const columns = {
            id: {
                label: "ID",
                sorting: true,
            },
            icon: {
                label: "ICON",
                sorting: false,
            },
            label: {
                label: "LABEL",
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
            course_ids: [],
            label: '',
            description: null,
            icon: '',
            tags: [],
            language_id: 1,
        });
        const initialState = {
            id: '',
            course_ids: [],
            label: '',
            description: null,
            icon: '',
            tags: [],
            language_id: 1,
        };

        const rules = computed(() => {
            return {
                label: {
                    required: helpers.withMessage('Please enter label of subject.', required),
                },
                description: {
                    required: helpers.withMessage('Please enter description of subject.', required),
                },
                icon: {
                    required: helpers.withMessage('Please enter icon of subject.', required),
                },
            }
        });
        const options = {
            fetch: 'subjects/fetch',
            getters: 'subjects/subjects',
            initialState,
            form,
            rules,
            create: 'subjects/create',
            update: 'subjects/update',
            delete: 'subjects/delete',
            moduleName: 'Subject(s)'
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
            editMode, 
            clearForm, 
            removeItem,
            parsed } = useCrud(options);

        onMounted(fetch);

        // This is very important from the create/edit form show.
        if (route.name === 'subjects') {
            view.value = false;
        } else {
            view.value = true;
        }

        const languages = computed(function() {
            return store.getters['subjects/languages'];
        });

        const courses = computed(function() {
            return store.getters['subjects/courses'];
        });

        const submitForm = async() => {
            try {
                let response = await submit();
                if (response) {
                    clearForm();
                    fetch();
                } else {
                    return response;
                }
            } catch (e) {

            }

        }

        function editItem(item, e) {
            clearForm(true);
            var elements = document.getElementsByClassName('bg-gray-200');
            while(elements.length > 0){
                elements[0].classList.remove('bg-gray-200');
            }
            document.getElementById('list-'+item.id).className = "bg-gray-200";
            
            editMode.value = true;
            
            form.id = item.id;
            form.course_ids = item.course_ids;
            form.label = item.label;
            form.description = item.description;
            form.icon = item.icon;
            form.language_id = item.language_id;
            form.tags = item.tags;

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
            submitForm,
            parsed,
            courses,
            view,
            fetch
        }
    },
    computed: {
        showPagination() {
            if ((this.items !== undefined) && (this.items.total / this.items.to > 1 || this.items.current_page != 1)) {
                return true;
            }
            return false;
        },

        result() {
            return this.items.data.map((item) => {
                let courses = [];
                let tagged = [];
                if (item.courses_subjects !==undefined) {
                    courses = item.courses_subjects.map((course) => {
                        if (course) {
                            return course.id;
                        } else {
                            return [];
                        }
                    });
                }

                if (item.tagged !==undefined) {
                    tagged = item.tagged.map((tag) => {
                        if (tag) {
                            return tag.tag_name;
                        } else {
                            return [];
                        }
                    });
                }

                return {
                    id: item.id,
                    course_ids: courses,
                    label: JSON.parse(item.label),
                    icon: item.icon,
                    description: JSON.parse(item.description),
                    language_id: item.language_id,
                    tags: tagged,
                };
            });
        }
    },
    methods: {
        showDeleteModal(itemId) {
            this.selectedItem = itemId;
            this.openModal(this.options.deleteComponentName, itemId)
        },
        random(string) {
            var s = '';
            var randomchar = function() {
                var n = Math.floor(Math.random() * 62);
                if (n < 10) return n; //1-10
                if (n < 36) return String.fromCharCode(n + 55); //A-Z
                return String.fromCharCode(n + 61); //a-z
            }
            while (s.length < string) s += randomchar();
            return s;
        }
    },
    watch: {
        '$route' (to, from) {
            if (to.name === 'subjects') {
                this.view = false;
                this.fetch(false);
            }
        }
    },
}
</script>
<style scoped>
.subject-table-div {
    width: 100%;
}
.active-row {
    background-color: chartreuse;
}
</style>
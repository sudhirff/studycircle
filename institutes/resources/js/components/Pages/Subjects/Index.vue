<template>
    <div>
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
                                        <td colspan="5" class="text-center">{{ $t('Sorry, no records found!')}}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                                                            
                                    <tr v-for="(item, index) in items.data" 
                                                    :key="index" 
                                                    :id="'list-'+item.id"
                                                    >
                                        <td class="border-b whitespace-nowrap">{{ item.id }}</td>
                                        <td class="border-b whitespace-nowrap">{{ item.icon }}</td>
                                        <td class="border-b whitespace">{{ parsed(item.label) }}</td>
                                        <td class="border-b whitespace">
                                            <span v-for="(tag, index) in item.tagged" :key="index" class="text-xs px-1 rounded-full bg-theme-17 text-white mr-1">
                                                #{{ tag.tag.name }}
                                            </span>
                                            
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
                        <h2 class="font-medium text-base mr-auto">{{ editMode? $t('subject.Edit Subject'): $t('subject.Add Subject')}}</h2>
                    </div>
                    <div class="p-5">
                        <div class="flex flex-col-reverse xl:flex-row flex-col">
                            <div class="flex-1 mt-6 xl:mt-0">
                                <form @submit.prevent="submit">
                                    <div class="grid grid-cols-12 gap-x-5">
                                        
                                        <div class="col-span-12 xxl:col-span-6">
                                            <div class="mt-3 ">
                                                <label for="subject-label" class="form-label"
                                                    >{{ $t('Label') }}</label
                                                >
                                                <input
                                                    id="subject-label"
                                                    type="text"
                                                    v-model="subject.label"
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
                                                    v-model="subject.description"
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
                                                    v-model="subject.icon"
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
                                                    v-model="subject.language_id"
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

                                                <tag v-model="subject.tags" 
                                                    :inputId="'subject-tags'"
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

        // Here we will fetch all the listing.
        //
        onMounted(() => {
            loadItems();
        })
        async function loadItems() {
            isLoading.value = true;
            try {
                await store.dispatch('subjects/fetch', params);
                isLoading.value = false;
            } catch (error) {
                error = error.message || 'Something went wrong!';
            }
            isLoading.value = false;
        }

        // After items are fetched, we have to get all the items using gettters
        const items = computed(function () {
            const getItems = store.getters['subjects/subjects'];
            if (getItems.data !== undefined) {
                if (getItems.data.length > 0)
                return getItems;
            }
            return false;
        });

        const languages = computed(function() {
            return store.getters['subjects/languages'];
        });

        const subject = reactive({
            id: '',
            label: '',
            description: null,
            icon: '',
            tags: [],
            language_id: 1,
        });

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

        const v$ = useVuelidate (rules, subject);

        async function submit() {
            submitted.value = true;

            v$.value.$validate(); // checks all inputs

            if (!v$.value.$error) {
                isLoading.value = true;
                try {
                    if (editMode.value === true) {
                        await store.dispatch('subjects/update', subject);
                        message.value = "Course type updated successfully.";
                    } else {
                        await store.dispatch('subjects/create', subject);
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
            subject.id = '',
            subject.label = '';
            subject.description = '';
            subject.icon = '';
            subject.tags = [];
            subject.language_id = 1;
        }

        function editItem(item) {
            var elements = document.getElementsByClassName('bg-gray-200');
            while(elements.length > 0){
                elements[0].classList.remove('bg-gray-200');
            }
            document.getElementById('list-'+item.id).className = "bg-gray-200";
            
            editMode.value = true;
            subject.id = item.id,
            subject.label = parsed(item.label);
            subject.description = parsed(item.description);
            subject.icon = item.icon;
            subject.language_id = item.language_id;
            
            subject.tags.length = 0;
            for (let i = 0; i < item.tagged.length; i++) {
                subject.tags.push(item.tagged[i].tag_name);
            }
            subject.language_id = item.language_id;
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
        
        function parsed(val) {
            if (isJSON(val)) {
                return JSON.parse(val);
            } else {
                return val;
            }
        }
        function isJSON(MyTestStr){
            try {
                var MyJSON = JSON.stringify(MyTestStr);
                var json = JSON.parse(MyJSON);
                if(typeof(MyTestStr) == 'string')
                    if(MyTestStr.length == 0)
                        return false;
            }
            catch(e){
                return false;
            }
            return true;
        }
        return {
            isLoading,
            columns,
            items,
            selectedItem,
            editItem,
            removeItem,
            showDelete,
            subject,
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
            languages,
            parsed
        }
    },
    computed: {
        showPagination() {
            if ((this.items !== undefined) && (this.items.total / this.items.to > 1 || this.items.current_page != 1)) {
                return true;
            }
            return false;
        },
    },
    methods: {
        showDeleteModal(itemId) {
            this.selectedItem = itemId;
            this.openModal(this.options.deleteComponentName, itemId)
        },
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
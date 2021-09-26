<template>
    <div>
        <div class="intro-y flex items-center mt-8">
            <h2 class="text-lg font-medium mr-auto">{{ $tc('Courses Types') }}</h2>
            <base-search-card @search="search"></base-search-card>
        </div>
        <div class="grid grid-cols-12 gap-6">
            <!-- BEGIN: Profile Menu -->
            <div
                class="col-span-12 lg:col-span-8 xxl:col-span-3 flex lg:block flex-col-reverse"
            >
                <div class="intro-y box mt-5">
                    <div class="relative flex items-center p-5">
                         <the-base-data-list-card class="course-type-table-div">
                            <the-base-crud-table>
                                <thead>
                                    <base-row-card :columns="columns" 
                                                    :showHeaders="true" 
                                                    @sorting="sort"
                                                    :field="sortField"
                                                    :direction="sortDirection"
                                                    ></base-row-card>
                                </thead>
                                <tbody id="listing">
                                    <tr v-for="(item, index) in items.data" 
                                                    :key="index" 
                                                    :id="'list-'+item.id"
                                                    >
                                        <td class="border-b whitespace-nowrap">{{ item.id }}</td>
                                        <td class="border-b whitespace-nowrap">{{ item.icon }}</td>
                                        <td class="border-b whitespace-nowrap">{{ parsed(item.label) }}</td>
                                        <td class="border-b whitespace-nowrap">{{ parsed(item.description) }}</td>
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
                <pagination align="center" :data="items" @pagination="paginate" v-if="showPagination"></pagination>
            </div>
            <!-- END: Profile Menu -->
            <div class="col-span-12 lg:col-span-4 xxl:col-span-9">
                <!-- BEGIN: Add form -->
                <div class="intro-y box lg:mt-5">
                    <div
                        class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
                    >
                        <h2 class="font-medium text-base mr-auto">{{ editMode? $t('coursetypes.Edit Course Type'): $t('coursetypes.Add Course Type')}}</h2>
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
                                        <button type="button" @click.prevent="clearForm()" class="btn btn-outline-secondary w-24 mr-1"> Cancel </button>
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
        <base-delete-modal-card v-if="showDelete" 
                                :item="selectedItem"
                                :moduleName="moduleName"
                                :key="selectedItem"></base-delete-modal-card>
        <loading v-if="isLoading" fixed></loading>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed } from "vue";

import BaseDeleteModalCard from '@/components/UI/BaseDeleteModalCard.vue';

import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators'


export default {
    components: {
        BaseDeleteModalCard,
    },
    data() {
        return {
            
        }
    },
    setup(props, context) {
        const store = useStore();
        const submitted = ref(false);

        const isErrored = ref(false);
        const message = ref('');
        const isLoading = ref(false);
        const selectedComponent = ref('Create');
        const selectedItem = ref();
        const showDelete = ref(false);
        const editMode = ref(false);

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
            description: {
                label: "DESCRIPTION",
                sorting: false,
            },
            actions: {
                label:"ACTIONS",
                sorting: false,
            }
        };

        // Here we will fetch all the listing.
        loadItems();

        async function loadItems() {
            isLoading.value = true;
            try {
                await store.dispatch('coursesType/fetch', params);
                isLoading.value = false;
            } catch (error) {
                error = error.message || 'Something went wrong!';
            }
            isLoading.value = false;
        }

        // After items are fetched, we have to get all the items using gettters
        const items = computed(function () {
            return store.getters['coursesType/coursesTypes'];
        });

        const courseType = reactive({
            id: '',
            label: '',
            description: '',
            icon: '',
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
                    if (editMode.value === true) {
                        await store.dispatch('coursesType/update', courseType);
                        message.value = "Course type updated successfully.";
                    } else {
                        await store.dispatch('coursesType/create', courseType);
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
            selectedComponent,
            selectedItem,
            editItem,
            removeItem,
            showDelete,
            courseType,
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
            moduleName: "Course Type"
        }
    },
    methods: {
        showDeleteModal(itemId) {
            this.selectedItem = itemId;
            this.openModal(this.options.deleteComponentName, itemId)
        },
        
        parsed(val) {
            if (this.isJSON(val)) {
                return JSON.parse(val);
            } else {
                return val;
            }
        },
        isJSON(MyTestStr){
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
        },
    },
    watch: {
        '$route' (to, from) {
            if (to.name === 'courseType') {
                this.$store.dispatch('coursesType/fetch');
            }
        }
    },
    computed: {
        showPagination() {
            if (this.items.total / this.items.to > 1 || this.items.current_page != 1) {
                return true;
            }
            return false;
        }
    }
}
</script>

<style scoped>
.course-type-table-div {
    width: 100%;
}
.active-row {
    background-color: chartreuse;
}
</style>
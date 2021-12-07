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
                                <tbody id="listing" v-if="!items">
                                    <tr>
                                        <td :colspan="Object.keys(columns).length" class="text-center">{{ $t('Sorry, no records found!')}}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                                                            
                                    <tr v-for="(item, index) in items.data" 
                                                    :key="index" 
                                                    :id="'list-'+item.id"
                                                    >
                                        <td class="border-b whitespace-nowrap">{{ item.id }}</td>
                                        <td class="border-b whitespace-nowrap">{{ item.icon }}</td>
                                        <td class="border-b whitespace-nowrap">{{ parsed(item.label) }}</td>
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
                                <form @submit.prevent="submitForm">
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
                                                    v-model.trim="form.label"
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
                                                    v-model.trim="form.description"
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
                                                    v-model="form.icon"
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
        
        <loading v-if="isLoading" fixed></loading>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed, onMounted } from 'vue'
import { required, helpers } from '@vuelidate/validators'

import BaseDeleteModalCard from '@/components/UI/BaseDeleteModalCard.vue';

import useCrud from '@/hooks/crud.js'

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
            actions: {
                label:"ACTIONS",
                sorting: false,
            }
        };
        
        const form = reactive({
            id: '',
            label: '',
            description: '',
            icon: '',
        });
        const initialState = {
            id: '',
            label: '',
            description: '',
            icon: '',
        };

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

        const options = {
            fetch: 'coursesType/fetch',
            getters: 'coursesType/coursesTypes',
            initialState,
            form,
            rules,
            create: 'coursesType/create',
            update: 'coursesType/update',
            delete: 'coursesType/delete',
            moduleName: 'Course Types(s)'
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
            removeItem } = useCrud(options);

        onMounted(fetch);
        
        function editItem(item) {
            clearForm(true);
            var elements = document.getElementsByClassName('bg-gray-200');
            while(elements.length > 0){
                elements[0].classList.remove('bg-gray-200');
            }
            document.getElementById('list-'+item.id).className = "bg-gray-200";
            
            editMode.value = true;
            
            form.id = item.id;
            form.label = parsed(item.label);
            form.description = parsed(item.description);
            form.icon = item.icon;
        }
        const submitForm = async() => {
            try {
                let response = await submit();
                if (response) {
                    if (!editMode) {
                        clearForm();
                    }
                    fetch();
                } else {
                    return response;
                }
            } catch (e) {

            }

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
            search,
            paginate, 
            sort,
            sortField: params.field,
            sortDirection: params.sort,
            editMode,
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
            parsed
        }
    },
    methods: {
        showDeleteModal(itemId) {
            this.selectedItem = itemId;
            this.openModal(this.options.deleteComponentName, itemId)
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
        },
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
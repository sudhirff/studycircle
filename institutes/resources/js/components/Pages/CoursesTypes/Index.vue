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
                         <the-base-data-list-card class="course-type-table-div">
                            <the-base-crud-table>
                                <thead>
                                    <base-row-card :columns="columns" :showHeaders="true"></base-row-card>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in items" 
                                                    :key="index" 
                                                    :columns="columns"
                                                    >
                                        <td>{{ item.id }}</td>
                                        <td>{{ item.icon }}</td>
                                        <td>{{ parsed(item.label) }}</td>
                                        <td>
                                            <div class="flex justify-center items-center">
                                                <a href="#"
                                                    @click.prevent="editItem(item)" 
                                                    >
                                                    <CheckSquareIcon class="w-4 h-4 mr-1" /> {{ $t('Edit')}}
                                                </a>
                                                <a class="flex items-center text-theme-21" 
                                                    href="#" 
                                                    data-toggle="modal" 
                                                    @click.prevent="removeItem(item)"
                                                    > 
                                                        <Trash2Icon class="w-4 h-4 mr-1" /> {{ $t('Delete')}}
                                                </a>
                                            </div>
                                        </td>
                                                    
                                    </tr>
                                    <!--<base-row-card v-for="(item, index) in items" 
                                                    :key="index" 
                                                    :columns="columns"
                                                    :item="item"
                                                    @EditRow="showEditModal"
                                                    @DeleteRow="showDeleteModal"
                                                    ></base-row-card>-->
                                </tbody>
                            </the-base-crud-table>
                        </the-base-data-list-card>
                    </div>
                </div>
            </div>
            <!-- END: Profile Menu -->
            <div class="col-span-12 lg:col-span-4 xxl:col-span-9">
                <!-- BEGIN: Add form -->
                <component v-if="(selectedComponent !== null && selectedComponent != 'BaseDeleteModalCard')" 
                        :is="selectedComponent"
                        @closeComp="removeComponent"
                        @deleteConfirm="deleteItem"
                        :item="selectedItem"
                        :moduleName="moduleName"
                        :key="selectedItem" 
                        @changeComponent="selectedComponent='Create'"
                        ><!-- :key attribute is most important to create new instance of each edit-->
                </component>
                
                <!-- END: Display Information <create></create>-->
            
            </div>
        </div>
        <loading v-if="isLoading" fixed></loading>
        <base-delete-modal-card v-if="showDelete"  
                                @closeComp="removeComponent"
                                @deleteConfirm="deleteItem"
                                :item="selectedItem"
                                :moduleName="moduleName"
                                :key="selectedItem"></base-delete-modal-card>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed } from "vue";

import useListing from '@/hooks/listing.js';
import BaseDeleteModalCard from '@/components/UI/BaseDeleteModalCard.vue';
import Create from './Create.vue'
import Edit from './Edit.vue'

export default {
    components: {
        BaseDeleteModalCard,
        Create,
        Edit
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
        //const isLoading = ref(false);
        const selectedComponent = ref('Create');
        const selectedItem = ref();
        const showDelete = ref(false);

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

        const options = {
            listGetter: 'coursesType/coursesTypes',
            listDispatch: 'coursesType/fetch',
            editComponentName: 'Edit',
            deleteDispatch: 'coursesType/delete',
            deleteComponentName: 'BaseDeleteModalCard',
            moduleName: "Courses Types"
        };
        
        const {
            isLoading,
            items,
            _selectedComponent,
            deleteItem,
            openModal,
            removeComponent,
            _selectedItem
         } = useListing(options);

        function editItem(item) {
            clear();
            selectedComponent.value = "Edit";
            selectedItem.value = item;
        }
        
        function removeItem(item) {
            showDelete.value = true;
            //selectedComponent.value = options.deleteComponentName;
            selectedItem.value = item.id;
        }

        async function clear()
        {
            await removeComponent();
        }
        return {
            isLoading,
            columns,
            options,
            items,
            selectedComponent,
            deleteItem,
            openModal,
            removeComponent,
            moduleName: options.moduleName,
            selectedItem,
            editItem,
            removeItem,
            showDelete
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
}
</script>

<style scoped>
.course-type-table-div {
    width: 100%;
}
</style>
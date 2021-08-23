<template>
    <div>
        <the-page-header :title="'User Listing'"></the-page-header>
        <the-base-card>
            <the-base-header-card>
                <the-add-new-button>
                    <a href="javascript:;" 
                        @click.prevent="openModal(options.createComponentName)"
                        class="btn btn-primary"
                        >
                        Add New User
                    </a>
                </the-add-new-button>
                <div class="hidden md:block mx-auto text-gray-600">
                    
                </div>
                <base-search-card></base-search-card>
            </the-base-header-card>
            
            <!-- BEGIN: Data List -->
            <the-base-data-list-card>
                <p v-if="isLoading">I am loading</p>
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
        </the-base-card>
        <!-- BEGIN: Component form -->

        <teleport to='#app'>
            <component v-if="selectedComponent !== null" 
                        :is="selectedComponent"
                        @closeComp="removeComponent"
                        @deleteConfirm="deleteItem"
                        :item="selectedItem"
                        :moduleName="moduleName"
                        ></component>
        </teleport>
        <!-- END: Component form -->
    </div>
    
</template>

<script>
import { ref } from 'vue';

import useListing from '@/hooks/listing.js';

import CreateUser from '@/components/Pages/Users/Create.vue';
import EditUser from '@/components/Pages/Users/Edit.vue';
import BaseDeleteModalCard from '@/components/UI/BaseDeleteModalCard.vue';

export default {
    components: {
        CreateUser,
        EditUser,
        BaseDeleteModalCard
    },
    setup(){
        
        const columns = {
            id: {
                label: "ID",
                sorting: true,
            },
            name: {
                label: "NAME",
                sorting: true,
            },
            email: {
                label: "EMAIL",
                sorting: true,
            },
            mobile_no: {
                label:"MOBILE",
                sorting: true,
            },
            actions: {
                label:"ACTIONS",
                sorting: false,
            }
        };

        const options = {
            createModalFormId: 'create-user',
            createComponentName: 'CreateUser',
            listGetter: 'users/users',
            listDispatch: 'users/fetchUsers',
            editModalFormId: 'edit-user',
            editComponentName: 'EditUser',
            editGetter: 'users/editUser',
            editDispatch: 'users/editUser',
            deleteDispatch: 'users/deleteUser',
            deleteComponentName: 'BaseDeleteModalCard',
            moduleName: "User"
        };
        
        const {
            isLoading,
            items,
            //editItemRequest,
            //editItem,
            selectedComponent,
            deleteItem,
            openModal,
            removeComponent,
            selectedItem
         } = useListing(options);

        return {
            columns,
            options,
            isLoading,
            items,
            //editItemRequest,
            //editItem,
            selectedComponent,
            deleteItem,
            openModal,
            removeComponent,
            selectedItem,
            moduleName: options.moduleName
        };
    },
    methods: {
        showEditModal(item) {
            this.openModal(this.options.editComponentName, item)
        },
        showDeleteModal(itemId) {
            this.openModal(this.options.deleteComponentName, itemId)
        }
    },
}
</script>

<style>

</style>
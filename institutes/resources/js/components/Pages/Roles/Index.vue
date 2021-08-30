<template>
    <div>
        <the-page-header :title="'Role Listing'"></the-page-header>
        <the-base-card>
            <the-base-header-card>
                <the-add-new-button>
                    <a href="javascript:;" 
                        @click.prevent="openModal(options.createComponentName)"
                        class="btn btn-primary"
                        >
                        Add New Role
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

import useListing from '@/hooks/listing.js';

import CreateRole from '@/components/Pages/Roles/Create.vue';
import EditRole from '@/components/Pages/Roles/Edit.vue';
import BaseDeleteModalCard from '@/components/UI/BaseDeleteModalCard.vue';

export default {
    components: {
        CreateRole,
        EditRole,
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
            actions: {
                label:"ACTIONS",
                sorting: false,
            }
        };

        const options = {
            createModalFormId: 'create-role',
            createComponentName: 'CreateRole',
            listGetter: 'roles/roles',
            listDispatch: 'roles/fetchRoles',
            editModalFormId: 'edit-role',
            editComponentName: 'EditRole',
            editGetter: 'roles/editRole',
            editDispatch: 'roles/editRole',
            deleteDispatch: 'roles/deleteRole',
            deleteComponentName: 'BaseDeleteModalCard',
            moduleName: "Role"
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
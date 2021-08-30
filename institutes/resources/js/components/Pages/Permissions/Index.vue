<template>
    <div>
        <the-page-header :title="'Permission Listing'"></the-page-header>
        <the-base-card>
            <the-base-header-card>
                <the-add-new-button>
                    <a href="javascript:;" 
                        @click.prevent="openModal(options.createComponentName)"
                        class="btn btn-primary"
                        >
                        Add New Permission
                    </a>
                </the-add-new-button>
                <div class="hidden md:block mx-auto text-gray-600">
                    
                </div>
                <base-search-card></base-search-card>
            </the-base-header-card>
            
            <!-- BEGIN: Data List -->
            <the-base-data-list-card>
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
        <loading v-if="isLoading" fixed></loading>
    </div>
</template>

<script>

import useListing from '@/hooks/listing.js';

import CreatePermission from '@/components/Pages/Permissions/Create.vue';
import EditPermission from '@/components/Pages/Permissions/Edit.vue';
import BaseDeleteModalCard from '@/components/UI/BaseDeleteModalCard.vue';

export default {
    components: {
        CreatePermission,
        EditPermission,
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
            createModalFormId: 'create-permission',
            createComponentName: 'CreatePermission',
            listGetter: 'permissions/permissions',
            listDispatch: 'permissions/fetchPermissions',
            editModalFormId: 'edit-permission',
            editComponentName: 'EditPermission',
            editGetter: 'permissions/editPermission',
            editDispatch: 'permissions/editPermission',
            deleteDispatch: 'permissions/deletePermission',
            deleteComponentName: 'BaseDeleteModalCard',
            moduleName: "Permission"
        };
        
        const {
            isLoading,
            items,
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
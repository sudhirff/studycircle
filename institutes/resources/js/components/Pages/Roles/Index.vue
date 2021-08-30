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
                <the-base-crud-table>
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap">SR. NO.</th>
                            <th class="whitespace-nowrap">NAME</th>
                            <th class="whitespace-nowrap">PERMISSIONS</th>
                            <th class="text-center whitespace-nowrap">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="intro-x" v-for="role in items" :key="role.id">
                            <td class="w-40">
                                <div class="flex">
                                    {{ role.id }}
                                </div>
                            </td>
                            <td>
                                <div>{{ role.name }}</div>
                            </td>
                            <td>
                                <span v-for="permission in role.permissions" 
                                        :key="permission.id" 
                                        class="text-xs px-1 rounded-full bg-theme-1 text-white mr-1">
                                    {{ permission.name }}
                                </span>
                            </td>
                            <td class="table-report__action w-56">
                                <div class="flex justify-center items-center">
                                    <a class="flex items-center mr-3" 
                                        href="#" 
                                        @click.prevent="editMe"
                                        > 
                                        <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                                    </a>
                                    <a class="flex items-center text-theme-21" 
                                        href="#" 
                                        data-toggle="modal" 
                                        @click.prevent="deleteMe"
                                        > 
                                        <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                                    </a>
                                </div>
                            </td>
                        </tr>

                        
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
            permissions: {
                label: "PERMISSIONS",
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
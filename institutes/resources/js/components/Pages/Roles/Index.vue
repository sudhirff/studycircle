<template>
    <div>
        <template v-if="listing">
            <the-page-header :title="'Role Listing'"></the-page-header>
            
            <the-base-card>
                <the-base-header-card>
                    <the-add-new-button>
                        <router-link to="/roles/create" 
                                    @click="listing = !listing" 
                                    class="btn btn-primary">Add New Role</router-link>
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
                            <tr v-for="(item, index) in items" :key="index">
                                <td>{{ item.id }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.permissions_count }}/{{totalPermissionsCount}}</td>
                                <td>
                                    <div class="flex justify-center items-center">
                                        <router-link :to="'/roles/'+item.id+'/edit'" 
                                                    class="flex items-center mr-3" 
                                                    @click.prevent="listing = !listing"
                                                    >
                                                    <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                                        </router-link>
                                        <a class="flex items-center text-theme-21" 
                                            href="#" 
                                            data-toggle="modal" 
                                            @click.prevent="showDeleteModal(item.id)"
                                            > 
                                                <Trash2Icon class="w-4 h-4 mr-1" /> Delete
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
                                            :showModal="false"
                                            :editUrl="'/roles/'+item.id+'/edit'"
                                            ></base-row-card>-->
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
        </template>
        <template v-else>
            <router-view></router-view>
        </template>
        <loading v-if="isLoading" fixed></loading>
    </div>
</template>

<script>

import useListing from '@/hooks/listing.js';

import BaseDeleteModalCard from '@/components/UI/BaseDeleteModalCard.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import { useStore } from 'vuex';
export default {
    components: {
        BaseDeleteModalCard
    },
    setup(){
        const store = useStore();
        const listing = ref(true);
        const route = useRoute();
        const router = useRouter();


        const columns = {
            id: {
                label: "ID",
                sorting: true,
                isMany: false,
            },
            name: {
                label: "NAME",
                sorting: true,
                isMany: false,
            },
            permissions_count: {
                label: "PERMISSIONS",
                sorting: true,
                isMany: true,
                manyFieldName: 'name',
            },
            actions: {
                label:"ACTIONS",
                sorting: false,
                isMany: false,
            }
        };

        // This is very important from the create/edit form show.
        if (route.fullPath === '/roles') {
            listing.value = true;
        } else {
            listing.value = false;
        }
        
        // Code below is to get all the permissions.
        getPermissions(); // Here we are calling 

        async function getPermissions() {
            await store.dispatch('permissions/permissionCount');
        }

        const options = {
            createModalFormId: 'create-role',
            createComponentName: 'CreateRole',
            listGetter: 'roles/roles',
            listDispatch: 'roles/fetchRoles',
            editModalFormId: 'edit-role',
            editComponentName: 'EditRole',
            editGetter: 'roles/edit',
            editDispatch: 'roles/edit',
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
            moduleName: options.moduleName,
            listing,
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
    watch: {
        '$route' (to, from) {
            if (to.fullPath === '/roles') {
                this.listing = true;
                this.$store.dispatch('roles/fetchRoles');
            }
        }
    },
    computed: {
        totalPermissionsCount() {
            return this.$store.state.permissions.permission_count;
        }
    },
}
</script>

<style>

</style>
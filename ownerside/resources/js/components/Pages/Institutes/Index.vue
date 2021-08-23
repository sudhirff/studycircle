<template>
    <div>
        
            <the-page-header :title="'Institutes Listing'"></the-page-header>
            <the-base-card>
                <the-base-header-card>
                    <the-add-new-button>
                        <router-link to="/institutes/create"
                            class="btn btn-primary"
                            @click="hideListing"
                            >
                            Add New Institute
                        </router-link>
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
                <router-view></router-view>
            </the-base-card>        
    </div>
</template>

<script>
import useListing from '@/hooks/listing.js';
import { ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
export default {
    data() {
        return {
            listing: true
        }
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const listing = ref(true);
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
            contact_number: {
                label: "CONTACT NUMBER",
                sorting: true,
            },            
            actions: {
                label:"ACTIONS",
                sorting: false,
            },
        }
        
        const options = {
            createModalFormId: 'create-user',
            createComponentName: 'CreateUser',
            listGetter: 'institutes/institutes',
            listDispatch: 'institutes/fetchInstitutes',
            editModalFormId: 'edit-user',
            editComponentName: 'EditUser',
            editGetter: 'institutes/editUser',
            editDispatch: 'institutes/editUser',
            deleteDispatch: 'institutes/deleteUser',
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

        function hideListing() {
            listing.value = false;
        }
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
            moduleName: options.moduleName,
            hideListing,
            listing
        };
    },
    computed: {
        listing() {
            if (window.location.pathname == "/institutes") {
                return true;
            }
            return false;
        }
    },
}
</script>

<style>

</style>
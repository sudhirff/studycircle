<template>
    <div>
        <template v-if="listing">
            <the-page-header :title="'Users'"></the-page-header>
            <the-base-card>
                <the-base-header-card>
                    <router-link :to="{name: 'userCreate'}" 
                                    @click="listing = !listing" 
                                    class="btn btn-primary shadow-md mr-2">{{ $t('Add New User')}} </router-link>
                    
                    <div class="dropdown">
                        <button
                            class="dropdown-toggle btn px-2 box text-gray-700 dark:text-gray-300"
                            aria-expanded="false"
                        >
                            <span class="w-5 h-5 flex items-center justify-center">
                                <PlusIcon class="w-4 h-4" />
                            </span>
                        </button>
                        <div class="dropdown-menu w-40">
                            <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                                <a
                                    href=""
                                    class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                                >
                                    <PrinterIcon class="w-4 h-4 mr-2" /> Print
                                </a>
                                <a
                                    href="javascript:;"
                                    data-toggle="modal" data-target="#import-modal"
                                    class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                                >
                                    <UploadCloudIcon class="w-4 h-4 mr-2" /> Import
                                </a>
                                
                                <a
                                    href="javascript:;"
                                    data-toggle="modal" data-target="#export-modal"
                                    class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                                >
                                    <DownloadCloudIcon class="w-4 h-4 mr-2" /> Export
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block mx-auto text-gray-600">
                        
                    </div>
                    <base-search-card @search="search"></base-search-card>
                </the-base-header-card>
                <!-- BEGIN: Data List -->
                <the-base-data-list-card class="user-table-div">
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
                                <td class="border-b whitespace">{{ item.name }}</td>
                                <td class="border-b whitespace">{{ item.email }}</td>
                                <td class="border-b whitespace">{{ item.mobile_no }}</td>
                                <td class="border-b whitespace-nowrap">
                                    <div class="flex justify-center items-center">
                                        <!--<router-link :to="{name: 'chapterEdit'}" 
                                            @click="listing = !listing" 
                                            class="btn btn-primary shadow-md mr-2">{{ $t('Add New Chapter')}} </router-link>-->
                                            
                                        <router-link :to="{name: 'userEdit', params: {id: item.id}}" 
                                            @click.prevent="listing = !listing" 
                                            class="flex items-center block p-2 transition duration-300 ease-in-out dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2  rounded-md "
                                            >
                                            <CheckSquareIcon class="w-4 h-4 mr-1" /> {{ $t('Edit')}}
                                        </router-link>
                                        <a class="flex items-center block p-2 transition duration-300 ease-in-out dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2  rounded-md text-theme-24" 
                                                href="#" 
                                                @click.prevent="removeItem(item)"
                                                > 
                                            <Trash2Icon class="w-4 h-4 mr-1" /> {{ $t('Delete')}}
                                        </a>
                                        <!--<router-link :to="{ name: 'chapterCreate' }"
                                                    class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2  rounded-md" >
                                            <EyeIcon class="w-4 h-4 mr-1" />
                                        </router-link>-->
                                    </div>
                                </td>       
                            </tr>
                        </tbody>
                    </the-base-crud-table>
                </the-base-data-list-card>
                <pagination align="center" v-if="showPagination && items" :data="items" @pagination="paginate"></pagination>
                <!-- End: Data List -->
            </the-base-card>            
        </template>
        <template v-else>
            <router-view></router-view>
        </template>
        
        <loading v-if="isLoading" fixed></loading>
        <!-- BEGIN: Component form -->

        <export-modal :moduleName="'users'"></export-modal>
        <import-modal></import-modal>
        <!-- END: Component form -->
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, computed, onMounted } from 'vue'
import { required, helpers } from '@vuelidate/validators'

import BaseDeleteModalCard from '@/components/UI/BaseDeleteModalCard.vue';

import Tag from '@/components/inputs/Tag.vue';

import useCrud from '@/hooks/crud.js'
import { useRoute, useRouter } from 'vue-router';

export default {
    components: {
        BaseDeleteModalCard,
        Tag,
    },
    setup() {
        const store = useStore();
        const listing = ref(true);
        const route = useRoute();
        const router = useRouter();

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
                sorting: false,
            },
            mobile_no: {
                label: "MOBILE",
                sorting: false,
            },
            actions: {
                label:"ACTIONS",
                sorting: false,
            }
        };

        const options = {
            fetch: 'users/fetch',
            getters: 'users/users',
            delete: 'users/delete',
            moduleName: 'User(s)'
        }
        const { 
            items, 
            fetch, 
            paginate, 
            search, 
            sort, 
            params, 
            isLoading, 
            removeItem,
            parsed,
            editItem,
            exportMe } = useCrud(options);

        onMounted(fetch(false));

        // This is very important from the create/edit form show.
        if (route.name === 'users') {
            listing.value = true;
        } else {
            listing.value = false;
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
            editItem,
            removeItem,
            parsed,
            listing,
            fetch,
            exportMe
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
        export() {

        }
    },
    watch: {
        '$route' (to, from) {
            if (to.name === 'users') {
                this.listing = true;
                this.fetch(false);
            }
        }
    },
}
</script>
<style scoped>
.user-table-div {
    width: 100%;
}
.active-row {
    background-color: chartreuse;
}
</style>
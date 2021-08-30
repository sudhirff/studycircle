<template>
    <div>
        <the-page-header :title="pageHeader"></the-page-header>
        <the-base-card>
            <the-base-header-card>
                <the-add-new-button>
                    <a href="javascript:;" 
                        @click.prevent="openModal(options.createComponentName, options.createModalFormId)"
                        class="btn btn-primary"
                        >
                        {{ addButtonText }}
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
                                        @DeleteItem="deleteItem"
                                        ></base-row-card>
                    </tbody>
                </the-base-crud-table>
            </the-base-data-list-card>
        </the-base-card>
        <!-- BEGIN: Component form -->

        <teleport to='#app'>
            <component v-if="selectedComponent !== ''" 
                        :is="selectedComponent"
                        :item="selectedItemId"></component>
        </teleport>
        <!-- END: Component form -->
    </div>
</template>

<script>
import { ref } from 'vue';
import useCrud from '@/hooks/crud.js';

import CreateUser from '@/components/Pages/Users/Create.vue';
import EditUser from '@/components/Pages/Users/Edit.vue';
import BaseDeleteModalCard from '@/components/UI/BaseDeleteModalCard.vue';

export default {
    components: {
        CreateUser,
        EditUser,
        BaseDeleteModalCard
    },
    props: {
        pageHeader: {
            type: String,
            required: false,
            default: 'Listing'
        },
        columns: {
            type: Object,
            required: false,
            default: []
        },
        addButtonText: {
            type: String,
            required: false,
            default: 'Add New'
        },
        options: {
            type: Object,
            required: false,
            default: {}
        }
    },
    setup(props, context) {
        const selectedItemId = ref('');
        const {
            isLoading,
            items,
            editItemRequest,
            editItem,
            openForm,
            selectedComponent,
            deleteItem,
            openModal
         } = useCrud(props.options);

        return {
            isLoading,
            items,
            editItemRequest,
            editItem,
            openForm,
            selectedComponent,
            deleteItem,
            selectedItemId,
            openModal
        };
    },
    methods: {
        showCreateModal() {
            
        },

        showEditModal(itemId) {
            this.selectedItemId.value = itemId;
        },
        showDeleteModal(itemId) {
            this.selectedComponent.value = 'BaseDeleteModalCard';
            this.selectedItemId.value = itemId;
            
            if (document.getElementById('delete-me') != undefined) {
                cash("#delete-me").modal("show");
            }
        }
    }
}
</script>

<style>

</style>
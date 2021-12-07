<template>
    <a class="flex items-center text-theme-21" 
        href="#" 
        data-toggle="modal" 
        @click.prevent="show=true"
        :data-target="`#`+dialogId"> 
            <Trash2Icon class="w-4 h-4 mr-1" /> Delete
    </a>
    <ConfirmationModal v-if="show" :id="dialogId" :show="show">
        <template #title>
            Delete {{moduleName}}
        </template>
        <template #content>
            Are you sure, you want to delete this {{moduleName}} ?
        </template>
        <template #footer>
            <button  type="button" data-dismiss="modal" class="btn btn-outline-secondary w-24 mr-1">Nevermind</button>
            <DangerButton @click="deleteItem(actionName, item)"
                            class="btn btn-danger w-24"
                            data-dismiss="modal">
                Delete
            </DangerButton>
        </template>
    </ConfirmationModal>
    
</template>

<script>
import {mapGetters} from 'vuex'

import ConfirmationModal from "@/components/shared/ConfirmationModal";
import DangerButton from "@/Components/shared/DangerButton";


export default {
    emits: ['close'],
    components: {
        ConfirmationModal,
        DangerButton
    },
    props: {
        moduleName: {
            required: true,
            type: String
        },
        dialogId: {
            required: true,
            type: String
        },
        item: {
            required: true,
            type: Object,
        },
        actionName: {
            required: true,
            type: String
        }
    },
    data() {
        return {
            show: false,
        }
    },
    methods: {
        deleteItem(actionName, item) {
            this.show = false;
            this.$store.dispatch(actionName, item)
            // Later on we will add toastify notification
        },
        close() {
            this.$emit('close')
        },
    },
    setup() {
        
    },
}
</script>

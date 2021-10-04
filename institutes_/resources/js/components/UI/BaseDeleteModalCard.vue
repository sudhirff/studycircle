<template>
    <!-- BEGIN: Delete Confirmation Modal -->
    <div id="delete-me" 
            class="modal" 
            tabindex="-1" 
            aria-hidden="false"
            data-backdrop="static" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <div class="p-5 text-center">
                        <i data-feather="x-circle" class="w-16 h-16 text-theme-6 mx-auto mt-3"></i> 
                        <div class="text-3xl mt-5">Are you sure?</div>
                        <div class="text-gray-600 mt-2">
                            <h2>
                                Delete {{moduleName}}
                            </h2>
                            <br>
                            <h3>
                                Are you sure, you want to delete this {{moduleName}} ?
                            </h3>
                            
                        </div>
                    </div>
                    <div class="px-5 pb-8 text-center">
                        <div>
                            <button type="button" 
                                    data-dismiss="modal" 
                                    class="btn btn-outline-secondary w-24 mr-1" 
                                    @click="closeModal">
                                    Nevermind
                            </button>
                            <button type="button" 
                                    class="btn btn-danger w-24" 
                                    data-dismiss="modal"
                                    @click="deleteItem"
                                    >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END: Delete Confirmation Modal -->
</template>

<script>
import { onMounted } from 'vue'

export default {
    emits: ['closeComp', 'deleteConfirm'],
    props: {
        moduleName: {
            type: String,
            required: false,
            default: 'Item',
        },
        item: {
            type: Number,
            required: true,
        },
    },
    setup() {
        onMounted(() => {
            cash("#delete-me").modal("show");
            });
    },
    methods: {
        closeModal() {
            this.$emit('closeComp');
        },
        deleteItem() {
            this.$emit('deleteConfirm', this.item);
        }
    },
}
</script>

<style>

</style>
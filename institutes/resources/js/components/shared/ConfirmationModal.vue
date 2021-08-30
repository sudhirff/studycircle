<template>
    <!-- BEGIN: Delete Confirmation Modal -->
    <div :id="dialogId" class="modal" tabindex="-1" aria-hidden="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <div class="p-5 text-center">
                        <i data-feather="x-circle" class="w-16 h-16 text-theme-6 mx-auto mt-3"></i> 
                        <div class="text-3xl mt-5">Are you sure?</div>
                        <div class="text-gray-600 mt-2">
                            <slot name="title"></slot>
                            <br>
                            <slot name="content"></slot>
                        </div>
                    </div>
                    <div class="px-5 pb-8 text-center">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END: Delete Confirmation Modal -->
</template>

<script>

    export default {
        emits: ['close'],

        props: {
            show: {
                default: false
            },
            maxWidth: {
                default: '2xl'
            },
            closeable: {
                default: true
            },
        },

        methods: {
            close() {
                this.$emit('close')
            },
        }
    }
</script>

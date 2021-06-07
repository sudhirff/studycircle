<template>
    <div>
        <div :id="divId" 
            class="modal modal-slide-over" 
            data-backdrop="static" 
            tabindex="-1" 
            aria-hidden="true"
            >
            <div class="modal-dialog">
                <div class="modal-content">
                    <a data-dismiss="modal" href="javascript:;">
                        <XIcon class="w-8 h-8 text-gray-500" />
                    </a>
                    <!-- BEGIN: Slide Over Header -->
                    <div class="modal-header">                        
                        <h2 class="font-medium text-base mr-auto">
                            {{ header }}
                        </h2>
                    </div>
                    <!-- END: Slide Over Header -->
                    <slot></slot>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        header: {
            type: String,
            default: '',
            required: false,
        },
        divId: {
            type: String,
            default: '',
            required: false,
        },
    }

}
</script>

<style>

</style>
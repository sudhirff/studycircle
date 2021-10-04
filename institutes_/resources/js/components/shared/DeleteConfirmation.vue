<template>
    <!-- BEGIN: Delete Confirmation Modal -->
    <div
      :id="divId"
      class="modal"
      tabindex="-1"
      aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <div class="p-5 text-center">
                        <XCircleIcon class="w-16 h-16 text-theme-21 mx-auto mt-3" />
                        <div class="text-3xl mt-5">Are you sure?</div>
                        <div class="text-gray-600 mt-2">
                            Do you really want to delete these records? <br />This process
                            cannot be undone.
                        </div>
                    </div>
                    <div class="px-5 pb-8 text-center">
                        <button
                            type="button"
                            data-dismiss="modal"
                            class="btn btn-outline-secondary w-24 mr-1"
                        >
                            Cancel
                        </button>
                        <button type="button" class="btn btn-danger w-24">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END: Delete Confirmation Modal -->
</template>

<script>
export default {

}
</script>

<style>

</style>
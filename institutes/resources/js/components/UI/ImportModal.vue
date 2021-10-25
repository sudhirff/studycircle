<template>
    <!-- BEGIN: Modal Content -->
    <div id="import-modal" class="modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- BEGIN: Modal Header -->
                <div class="modal-header">
                    <h2 class="font-medium text-base mr-auto">
                        <FileIcon class="w-4 h-4 mr-2" /> Export
                    </h2>
                </div>
                <!-- END: Modal Header -->
                <!-- BEGIN: Modal Body -->
                <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
                    <div class="col-span-12 sm:col-span-6">
                        <label for="modal-form-1" class="form-label">From</label>
                        <input id="modal-form-1" type="text" class="form-control" placeholder="example@gmail.com" />
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                        <label for="modal-form-2" class="form-label">To</label>
                        <input id="modal-form-2" type="text" class="form-control" placeholder="example@gmail.com" />
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                        <label for="modal-form-3" class="form-label">Subject</label>
                        <input id="modal-form-3" type="text" class="form-control" placeholder="Important Meeting" />
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                        <label for="modal-form-4" class="form-label">Has the Words</label>
                        <input id="modal-form-4" type="text" class="form-control" placeholder="Job, Work, Documentation" />
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                        <label for="modal-form-5" class="form-label">Doesn't Have</label>
                        <input id="modal-form-5" type="text" class="form-control" placeholder="Job, Work, Documentation" />
                    </div>
                    <div class="col-span-12 sm:col-span-6">
                        <label for="modal-form-6" class="form-label">Size</label>
                        <select id="modal-form-6" class="form-select">
                            <option>10</option>
                            <option>25</option>
                            <option>35</option>
                            <option>50</option>
                        </select>
                    </div>
                </div>
                <!-- END: Modal Body -->
                <!-- BEGIN: Modal Footer -->
                <div class="modal-footer text-right">
                    <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-20 mr-1">
                        Cancel
                    </button>
                    <button type="button" class="btn btn-primary w-20">
                        Send
                    </button>
                </div>
                <!-- END: Modal Footer -->
            </div>
        </div>
    </div>
    <!-- END: Modal Content -->
</template>

<script>
export default {

}
</script>

<style>

</style>
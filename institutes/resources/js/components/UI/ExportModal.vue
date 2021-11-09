<template>
    <!-- BEGIN: Modal Content -->
    <div id="export-modal" class="modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- BEGIN: Modal Header -->
                <div class="modal-header">
                    <h2 class="font-medium text-base mr-auto">
                        <FileIcon class="w-4 h-4 mr-2" /> {{ $t('Export') }}
                    </h2>
                </div>
                <!-- END: Modal Header -->
                <form enctype="multipart/form-data" @submit.prevent="exportMe">
                    <!-- BEGIN: Modal Body -->
                    <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
                        <div class="col-span-12 sm:col-span-12">
                            <label for="export-as" class="form-label">{{ $t('Export as') }}</label>
                            <select id="export-as" class="form-select" v-model="form.export_as">
                                <option value="">{{ $t('Select') }}</option>
                                <option value="xlsx">{{ $t('XLSX') }}</option>
                                <option value="csv">{{ $t('CSV') }}</option>
                                <option value="pdf">{{ $t('PDF') }}</option>
                            </select>
                        </div>
                        <!--<div class="col-span-12 sm:col-span-6">
                            <label for="modal-form-1" class="form-label">Export with all relations</label>
                            <input id="modal-form-1" type="checkbox" class="form-control" />
                        </div>
                        -->
                    </div>
                    <!-- END: Modal Body -->
                    <!-- BEGIN: Modal Footer -->
                    <div class="modal-footer text-right">
                        <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-20 mr-1">
                            {{ $t('Cancel') }}
                        </button>
                        <button type="submit" data-dismiss="modal" class="btn btn-primary w-20">
                            {{ $t('Export') }}
                        </button>
                    </div>
                    <!-- END: Modal Footer -->
                </form>
                
            </div>
        </div>
    </div>
    <!-- END: Modal Content -->
</template>

<script>
import axios from 'axios'
import { ref } from 'vue';
export default {
    props: {
        modelName: {
            type: String,
            required: false
        }
    },
    setup(props, context) {
        const form = {
            export_as: ''
        };
        const downloadFileName = ref('');
        
        async function exportMe() {

            downloadFileName.value = props.modelName+"."+form.export_as;
            const req = {
                fileName: downloadFileName.value,
                modelName: props.modelName
            };
            axios({
                    url: '/api/v1/exports/index',
                    method: 'POST',
                    data: req,
                    responseType: 'blob',  
                })
                .then((response) => {
                        if(response.status === 200) {
                            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                            var fileLink = document.createElement('a');
                            fileLink.href = fileURL
                            fileLink.setAttribute('download', downloadFileName.value);
                            document.body.appendChild(fileLink);
                            fileLink.click();
                        }
                    })
                .catch();
        }
        return {
            form,
            exportMe,
        }
    }
}
</script>

<style>

</style>
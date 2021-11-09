<template>
    <!-- BEGIN: Modal Content -->
    <div id="import-modal" class="modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- BEGIN: Modal Header -->
                <div class="modal-header">
                    <h2 class="font-medium text-base mr-auto">
                        <FileIcon class="w-4 h-4 mr-2" /> {{ $t('Import') }}
                    </h2>
                </div>
                <!-- END: Modal Header -->
                <form enctype="multipart/form-data" @submit.prevent="importMe">
                    <!-- BEGIN: Modal Body -->
                    <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
                        <div class="col-span-12 sm:col-span-12">
                            <label for="export-as" class="form-label">{{ $t('Import') }}</label>
                            <input type="file"
                                class="custom-file-input"
                                :class="{'is-invalid' : error.message }" 
                                id="input-file-import" 
                                name="file_import" 
                                ref="import_file" 
                                @change="onFileChange($event)"
                                >
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
        
        function onFileChange(e) {
            import_file = e.target.files[0];
            if (this.import_file.size > constant.IMG_SIZE) {
                e.preventDefault();
                this.showToast(this.$i18n.t('LABEL_IMAGE'), this.$i18n.t('LABEL_TOO_BIG', { str:this.import_file.name }), 'danger');
                this.loading = false;
            } else {
                if(e.target.files[0]['type'] === 'text/csv') { 
                    this.proceedAction();
                } else {
                    this.loading = false;
                    this.importError = true;
                    this.showToast(this.$i18n.t('LABEL_IMPORT'), this.$i18n.t('LABEL_FILETYPE'), 'danger');   
                }
            }
            this.$refs.import_file = null;
            this.errorMessages = null;
            this.importError = false;
            this.successful = false;
            this.importWarning = false;
        }

        function proceedAction() {
            this.loading = true;
            let formData = new FormData();
            formData.append('import_file', this.import_file);
                axios.post(constant.BASE_URL + "/" + this.getUrlExtension(this.module) + "/import", formData, {
                    headers: { 'content-type': 'multipart/form-data' }
                })
                .then(response => {
                    if(response.status === constant.HTTP_OK) {
                        // codes here after the file is upload successfully
                        if(response.data.message.length > 0 ) {
                            this.loading = false;   
                            this.uploading = false
                            this.importError = false;
                            this.importWarning = true;
                            this.errorMessages = response.data.message

                        } else { 
                            this.showToast(this.$i18n.t('LABEL_IMPORT'), this.$i18n.t('SUCCESSFULLY_UPDATED'), 'success');
                            this.successful = true;
                            this.loading = false;
                            this.$bvModal.hide('edit-user')
                            this.$emit('callback')
                        }
                    }
                })
                .catch(error => {
                    // code here when an upload is not valid
                    this.showToast(this.$i18n.t('LABEL_IMPORT'), this.$i18n.t('LABEL_ERROR'), 'danger');
                    this.uploading = false
                    this.importError = true;
                    this.error = error.response.data
                    this.loading = false;   
                });
        }
        return {
            form,
            onFileChange,
            proceedAction
        }
    }
}
</script>

<style>

</style>
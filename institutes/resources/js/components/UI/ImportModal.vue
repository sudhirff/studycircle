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
                <form enctype="multipart/form-data" @submit.prevent="proceedAction">
                    <!-- BEGIN: Modal Body -->
                    <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">

                        <div class="col-span-12 sm:col-span-12">
                            
                            <label for="import" class="form-label mr-3">{{ $t('Import') }}</label>
                            <span class="btn btn-primary btn-file">
                                Browse...<input 
                                            type="file"
                                            id="import" 
                                            name="file_import" 
                                            ref="import_file"
                                            @change.prevent="onFileChange"
                                            >
                            </span>
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
                            {{ $t('Import') }}
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
        },
        allowedExtensions: {
            type: Array,
            required: false,
        }
    },
    setup(props, context) {
        const error = ref('');
        const import_file = ref('');
        const importError = ref(false);
        const successful = ref(false);
        const loading = ref(false);
        const uploading = ref(false);
        const fileName = ref('');
        const errorMessages = ref({});
        const importWarning = ref(false);
        const isHidden = ref(false);
        //const allowedExtensions = props.allowedExtensions;
        const allowedExtensions = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
            'application/vnd.ms-excel',
        ];
        console.log(allowedExtensions);
        function onFileChange(e) {
            import_file.value = e.target.files[0];
            
            if (!allowedExtensions.includes(e.target.files[0]['type']) || import_file.value.size > 20000) {
                alert('Wrong file type or wrong file size.');
                error.message = "Please select xsls or csv file to import.";
                return ;
            } else {
                loading.value = true;
                importError.value = false;
            }
            
            //$refs.import_file = null;
            errorMessages.value = null;
            importError.value = false;
            successful.value = false;
            importWarning.value = false;
        }

        function proceedAction() {
            loading.value = true;
            let formData = new FormData();
            formData.append('import_file', import_file.value);

            axios.post("/api/v1/imports", formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            .then(response => {
                if(response.status === constant.HTTP_OK) {
                    // codes here after the file is upload successfully
                    if(response.data.message.length > 0 ) {
                        loading.value = false;
                        uploading.value = false
                        importError.value = false;
                        importWarning.value = true;
                        errorMessages.value = response.data.message

                    } else {
                        successful = true;
                        loading = false;
                        //$bvModal.hide('edit-user')
                        //$emit('callback')
                    }
                }
            })
            .catch(error => {
                // code here when an upload is not valid
                //this.showToast(this.$i18n.t('LABEL_IMPORT'), this.$i18n.t('LABEL_ERROR'), 'danger');
                uploading.value = false
                importError.value = true;
                error.value = error.response.data
                loading.value = false;   
            });
        }
        return {
            onFileChange,
            proceedAction,
            error,
            import_file,
        }
    }
}
</script>

<style scoped>

.btn-file {
  position: relative;
  overflow: hidden;
}
.btn-file input[type=file] {
  position: absolute;
  left: 10px;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  background: white;
  cursor: inherit;
  display: block;
}
</style>
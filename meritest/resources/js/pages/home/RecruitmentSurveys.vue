<template>
    <div>
        <base-dialog :title="'Recruitment & Surveys'" @close="$emit('close')">
            <template #default>
                <div>
                    Information about Recruitment &amp; Surveys
                </div>
            </template>
        </base-dialog>
        
    </div>
</template>

<script>
import BaseDialog from '../../UI/BaseDialog.vue'

export default {
    components: {
        BaseDialog,
    },
    emits: ['close']
}
</script>

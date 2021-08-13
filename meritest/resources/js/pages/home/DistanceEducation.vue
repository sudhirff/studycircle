<template>
    <div>
        <base-dialog :title="'Distance education'" @close="$emit('close')">
            <template #default>
                <div>
                    Information about Distance education
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

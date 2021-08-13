<template>
    <div>
        <base-dialog :title="'Coaching classes'" @close="$emit('close')">
            <template #default>
                <div>
                    Information about Coaching classes
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

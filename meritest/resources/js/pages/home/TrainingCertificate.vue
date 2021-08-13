<template>
    <div>
        <base-dialog :title="'Training Certificate'" @close="$emit('close')">
            <template #default>
                <div>
                    Information about Training Certificate
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

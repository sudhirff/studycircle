<template>
    <div>
        <base-dialog :title="'IT Solutions'" @close="$emit('close')">
            <template #default>
                <div>
                    Information about IT Solutions
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

<template>
    <div>
        <base-dialog :title="'Collage and Universities'" @close="$emit('close')">
            <template #default>
                <div>
                    Information about Collage and Universities
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

<template>
    <div>
        <base-dialog :title="'School and Olympiads'" @close="$emit('close')">
            <template #default>
                <div>
                    Information about School and Olympiads
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

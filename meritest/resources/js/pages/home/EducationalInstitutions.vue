<template>
    <div>
        <base-dialog :title="'Educational Institutions'" @close="$emit('close')">
            <template #default>
                <div>
                    <p>An educational institution is a place where people of different ages gain an education, including preschools, childcare, primary-elementary schools, secondary-high schools, and universities. They provide a large variety of learning environments and learning spaces.</p>
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

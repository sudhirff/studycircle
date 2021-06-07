<template>
    <div>
        <a class="flex items-center mr-3" 
            href="#" 
            @click.prevent="editModalForm(dialogId)"
            > 
                <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
        </a>
        <ModalBoxCard :divId="dialogId" 
                        :header="modalHeader"
                        >
            <slot></slot>
            
        </ModalBoxCard>
    </div>
</template>

<script>
import ModalBoxCard from '@/components/shared/ModalBoxCard'

export default {
    components: {
        ModalBoxCard,
    },
    props: {
        moduleName: {
            required: true,
            type: String
        },
        dialogId: {
            required: true,
            type: String
        },
        item: {
            required: true,
            type: Number,
        },
        actionName: {
            required: true,
            type: String
        },
        modalHeader: {
            required: false,
            type: String
        }
    },
    data() {
        return {
            show: false,
        }
    },
    methods: {
        editModalForm(dialogId)
        {
            cash("#"+dialogId).modal("show");
        }
    },
    setup() {
        
    },
}
</script>

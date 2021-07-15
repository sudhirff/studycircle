<template>
    <tr :class="{ 'intro-x': (!showHeaders) }">
        <template v-if="showHeaders">
            <th class="whitespace-nowrap" 
                v-for="(column, index) in columns" 
                :key="index"
                :class="{ ' text-center': (index == 'actions') }">
                {{ column.label }}
            </th>
        </template>
        <template v-else>
            <td v-for="(column, index) in columns" :key="index"  
                :class="{ 'table-report__action w-56': (index === 'actions') }">
                <template v-if="index !== 'actions'">
                    {{ item[index] }}                    
                </template>
                <template v-else>
                    <div class="flex justify-center items-center">
                        <a class="flex items-center mr-3" 
                            href="#" 
                            @click.prevent="editMe"
                            > 
                            <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                        </a>
                        <a class="flex items-center text-theme-21" 
                            href="#" 
                            data-toggle="modal" 
                            @click.prevent="deleteMe"
                            > 
                                <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                        </a>
                    </div>
                </template>
            </td>
        </template>
    </tr>
</template>

<script>


export default {
    emits: ['EditRow', 'DeleteRow', 'DeleteItem'],
    props: {
        item: {
            type: Object,
            required: false,
        },
        columns: {
            type: Object,
            required: true
        },
        showHeaders: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    setup(props, context) {
        function editMe() {
            context.emit('EditRow', props.item)
        }
        function deleteMe() {
            context.emit('DeleteRow', props.item.id)
        }
        function deleteItem(itemId) {
            context.emit('DeleteItem', itemId)
        }
        return {
            editMe,
            deleteMe,
            deleteItem
        };
    },
}
</script>

<style>

</style>
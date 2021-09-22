<template>
    <tr :class="{ 'intro-x': (!showHeaders) }">
        <template v-if="showHeaders">
            <th class="whitespace-nowrap" 
                v-for="(column, index) in columns" 
                :key="index"
                :class="{ ' text-center': (index == 'actions') }">
                {{ $tc(column.label) }}
                <span></span>
            </th>
        </template>
        <template v-else>
            <td v-for="(column, index) in columns" :key="index"  
                :class="{ 'table-report__action w-56': (index === 'actions') }">
                <template v-if="index !== 'actions'">
                    <template v-if="column.isMany">
                        <span v-for="many in item[index]" 
                                :key="many.id" 
                                class="text-xs px-1 rounded-full bg-theme-1 text-white mr-1">
                            {{ $tc(many[column.manyFieldName]) }}
                        </span>
                    </template>
                    <template v-else>
                        <!-- {{ parsed(item[index]) }}-->
                        {{ item[index] }}
                    </template>
                </template>
                <template v-else>
                    <div class="flex justify-center items-center">
                        <template v-if="showModal">
                            <a class="flex items-center mr-3" 
                                href="#" 
                                @click.prevent="editMe"
                                > 
                                <CheckSquareIcon class="w-4 h-4 mr-1" /> {{ $tc('Edit')}}
                            </a>
                        </template>
                        <template v-else>
                            <router-link :to="editUrl" class="flex items-center mr-3">
                                {{ $tc('Edit') }}
                            </router-link>
                        </template>
                        <a class="flex items-center text-theme-21" 
                            href="#" 
                            data-toggle="modal" 
                            @click.prevent="deleteMe"
                            > 
                                <Trash2Icon class="w-4 h-4 mr-1" /> {{ $tc('Delete') }}
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
        },
        showModal: {
            type: Boolean,
            required: false,
            default: true,
        },
        editUrl: {
            type: String,
            required: false,
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
    methods: {
        /*parsed(val) {
            if (this.isJSON(val)) {
                return JSON.parse(val);
            } else {
                return val;
            }
        },
        isJSON(MyTestStr){
            try {
                var MyJSON = JSON.stringify(MyTestStr);
                var json = JSON.parse(MyJSON);
                if(typeof(MyTestStr) == 'string')
                    if(MyTestStr.length == 0)
                        return false;
            }
            catch(e){
                return false;
            }
            return true;
        }*/
    },
}
</script>

<style>

</style>
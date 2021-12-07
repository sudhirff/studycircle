<template>
    <tr :class="{ 'intro-x': (!showHeaders) }">
        <template v-if="showHeaders">
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap" 
                v-for="(column, index) in columns" 
                :key="index"
                :class="{ ' text-center': (index == 'actions') }">
                <template v-if="column.sorting">
                    <a href="#" @click.prevent="sort(index)">
                        {{ $tc(column.label) }}
                        <template v-if="(index === setField) && setDirection === 'desc'"><ChevronDownIcon /></template>
                        <template v-else-if="(index === setField) && setDirection === 'asc'"><ChevronUpIcon /></template>
                        
                    </a>
                </template>
                <template v-else>{{ $tc(column.label) }}</template>
            </th>
        </template>
        <template v-else>
            <td v-for="(column, index) in columns" 
                :key="index"
                class="border-b whitespace-nowrap"  
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
                        <a class="flex items-center text-theme-24" 
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

import { ref } from "vue";

export default {
    emits: ['EditRow', 'DeleteRow', 'DeleteItem', 'sorting'],
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
        },
        field: {
            type: String,
            required: false,
        },
        direction: {
            type: String,
            required: false,
        }
    },
    setup(props, context) {
        const setDirection = ref(props.direction);
        const setField = ref(props.field);
        
        function editMe() {
            context.emit('EditRow', props.item)
        }
        function deleteMe() {
            context.emit('DeleteRow', props.item.id)
        }
        function deleteItem(itemId) {
            context.emit('DeleteItem', itemId)
        }
        function sort(index) {
            if (setField.value === index) {
                switch (setDirection.value) {
                    case null:
                        setDirection.value = 'asc';
                        break;
                    case 'asc':
                        setDirection.value = 'desc';
                        break;
                    case 'desc':
                        setDirection.value = 'asc';
                        break;
                    }
            } else {
                setDirection.value = 'desc'
            }
            setField.value = index;

            context.emit('sorting', [setField.value, setDirection.value]);
        }
        return {
            editMe,
            deleteMe,
            deleteItem,
            sort,
            setDirection,
            setField
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
<template>
    <ul :class="isChild ? 'children': ''">
        <li v-for="(item, index) in items" 
            :key="index">
            <div class="flex flex-col sm:flex-row items-center p-2 border-b border-gray-200 dark:border-dark-5"
                >
                <h2 class="font-medium text-base mr-auto">
                    <span v-if="item.children.length != 0" >
                        <a href="#" 
                            @click.prevent="toggle(item.name+'-'+item.id)"
                            >
                            <span v-show="false" :id="'chevron-down-'+item.name+'-'+item.id"><ChevronsDownIcon class="w-5 h-5"/>{{ item.name }}</span>
                            <span :id="'chevron-right-'+item.name+'-'+item.id" ><ChevronsRightIcon class="w-5 h-5"/>{{ item.name }}</span>
                        </a>
                    </span>
                    <span v-else>{{ item.name }}</span>
                </h2>
                <input v-show="editOffset==index" type="text" 
                        :id = "'item-user-'+index"
                        @keydown.enter="updatePost" @keydown.esc="cancelEditing"
                        class="form-control" v-model="editPost.user" />
                        
                <div class="w-full sm:w-auto flex items-center sm:ml-auto mt-3 sm:mt-0">
                    <Tippy
                        tag="a"
                        href="javascript:;"
                        @click.prevent="addCategory(item.id)"
                        class="tooltip btn btn-primary mr-1 mb-2"
                        content="Add a sub course category."
                        ><PlusIcon class="w-5 h-5" /></Tippy
                        >
                        <component :is="selectedComponent" v-if="showForm"></component>
                    <Tippy
                        tag="button"
                        class="tooltip btn btn-warning mr-1 mb-2"
                        content="Edit course category."
                        @click.prevent="startEditing(index)" 
                        ><EditIcon class="w-5 h-5" /></Tippy
                        >
                    <Tippy
                        tag="button"
                        class="tooltip btn btn-danger mr-1 mb-2"
                        content="Delete course category."
                        ><TrashIcon class="w-5 h-5" /></Tippy
                        >
                </div>
            </div>
            <tree-row-card v-if="item.children"
                            :items="item.children" 
                            :id="item.name + '-'+item.id"
                            :isChild="true"
                            v-show="false"
                            ></tree-row-card>
        </li>
    </ul>
</template>

<script>
import CreateCourse from '@/components/Pages/CourseCategories/Create.vue';

export default {
    components: {
        CreateCourse,
    },
    props: {
        items: {
            type: Object,
            required: true,
        },
        parentId: {
            type: Number,
            required: false,
        },
        /*showChildOf: {
            type: String,
            required: false,
        },*/
        rowExpanded: {
            type: Boolean,
            required: false,
            default: false,
        },
        isChild: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    data() {
        return {
            selectedComponent: '',
            showForm: false,
            isChildShow: false,
            isShowChildren: false,
            editOffset: -1,
            editPost: {},
            editPostOri: {},
        }
    },
    methods: {
        startEditing(index) {
            this.editOffset = index
            this.editPost = this.items[index]
            this.editPostOri = JSON.parse(JSON.stringify(this.editPost))
            // set focus ke element input
            this.$nextTick(function(){
                console.log('item-user-'+this.editOffset)
                document.getElementById('item-user-'+this.editOffset).focus()
            }.bind(this))
        },
        updatePost() {
            this.editOffset = -1
            this.editPostOri = {}
            this.editPost = {}
        },
        cancelEditing() {
            this.$set(this.items, this.editOffset, this.editPostOri)
            this.editOffset = -1
            this.editPostOri = {}
            this.editPost = {}
        },
        toggle(idName) {
            if (document.getElementById(idName).style.display == "none") {
                document.getElementById(idName).style.display = "block";
                document.getElementById('chevron-down-'+idName).style.display = "block";
                document.getElementById('chevron-right-'+idName).style.display = "none";
            } else {
                document.getElementById(idName).style.display = "none";
                document.getElementById('chevron-down-'+idName).style.display = "none";
                document.getElementById('chevron-right-'+idName).style.display = "block";
            }
        }
    },
    computed: {
        /*showChildOf() {
            return 'children-of-'
        }*/
    }
}
</script>

<style scoped>
.children {
    padding-left: 3rem;
}
</style>
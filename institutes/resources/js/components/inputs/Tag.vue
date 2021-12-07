<template>
    <div class='tag-input'>
        <div v-for='(tag, index) in tags' :key='tag' class='tag-input__tag'>
            <span @click='removeTag(index)'>x</span>
            {{ tag }}
        </div>
        <input 
            type="text"
            placeholder="Enter a Tag" 
            class='tag-input__text' 
            @keydown.enter='addTag' 
            @keydown.188='addTag' 
            @keydown.delete='removeLastTag'
        />
    </div>
</template>

<script>
import { onUpdated, ref } from 'vue';
export default {
    props: {
        modelValue: {
            type: Array, 
            default: () => [] 
        },
    },
    
    setup(props, context) {
        const tags = ref(props.modelValue);

        let newTags = onUpdated(function() {
            tags.value = props.modelValue;
        });
        tags.value = newTags;
        function addTag (event) {
            
            event.preventDefault()
            var val = event.target.value.trim();
            if (!val) return; // prevent empty tag
            if (tags.value.includes(val)) {
                //handleDuplicate(val);
                return;
            }
            if (val.length > 0) {
                tags.value.push(val)
                event.target.value = ''
            }
            context.emit("update:modelValue", tags);
        }
        function removeTag (index) {
            tags.value.splice(index, 1)
        }
        function removeLastTag(event) {
            if (event.target.value.length === 0) {
                removeTag(tags.value.length - 1)
            }
        }
        return {
            tags,
            addTag,
            removeTag,
            removeLastTag
        }
    },
}
</script>

<style scoped>
.tag-input {
    width: 100%;
    border: 1px solid #eee;
    height: auto;
    box-sizing: border-box;
    padding: 0 10px;
}

.tag-input__tag {
    height: 30px;
    float: left;
    margin-right: 10px;
    background-color: #eee;
    margin-top: 10px;
    line-height: 30px;
    padding: 0 5px;
    border-radius: 5px;
}

.tag-input__tag > span {
    cursor: pointer;
    opacity: 0.75;
}

.tag-input__text {
    /**/border: none;
    outline: none;
    
    line-height: 50px;
    background: none;
}
</style>
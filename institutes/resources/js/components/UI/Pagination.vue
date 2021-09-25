<template>
    <div
        class="
        intro-y
        col-span-12
        flex flex-wrap
        sm:flex-row sm:flex-nowrap
        items-center
        mt-5
        "
        >
        <ul class="pagination">
            <li>
                <a href="#" 
                    class="pagination__link" 
                    :class="data.current_page === 1 ? 'disabled': ''"
                    @click.prevent="changePage(data.current_page - 1)">
                    <ChevronsLeftIcon class="w-4 h-4" />
                </a>
            </li>
            <li v-for="(pageNo, index) in data.last_page" :key="index">
                <a class="pagination__link "
                    :class="data.current_page === pageNo ?' pagination__link--active' : ''"
                    href="#" @click.prevent="changePage(pageNo)">
                    {{ pageNo }}
                </a>
            </li>
            <li>
                <a class="pagination__link" 
                    :class="data.last_page === data.current_page ? 'disabled': ''"
                    href="#" 
                    @click.prevent="changePage(data.current_page + 1)">
                    <ChevronsRightIcon class="w-4 h-4" />
                </a>
            </li>
        </ul>
        <select class="w-20 form-select box mt-3 sm:mt-0">
            <option>5</option>
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
        </select>
    </div>
</template>

<script>
export default {
    emits: ['pagination'],
    props: {
        data: {
            type: Object,
            required: true
        },

    },
    data() {
        return {
            page: 1,
        }
    },
    methods: {
        changePage(pageNo) {
            this.$emit('pagination', pageNo);
        }
    },
    
};
</script>

<style scoped>
a.disabled {
    pointer-events: none;
    color: #ccc;
}
</style>
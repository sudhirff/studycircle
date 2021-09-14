<template>
    <div>
        <template v-if="listing">
            <router-link to="/subjects/create" @click="listing = !listing">Create</router-link>
        </template>
        <template v-else>
            <router-view></router-view>
        </template>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
export default {
    setup(props) {
        const listing = ref(true);
        const route = useRoute();
        const router = useRouter();

        // This is very important from the create/edit form show.
        if (route.fullPath === '/subjects') {
            listing.value = true;
        } else {
            listing.value = false;
        }
        
        return {
            listing,
        }
    },
    watch: {
        '$route' (to, from) {
            if (to.fullPath === '/subjects') {
                this.listing = true;
            }
        }
    },
}
</script>

<style>

</style>
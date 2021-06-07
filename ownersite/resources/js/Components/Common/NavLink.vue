<template>
    <inertia-link :href="href" preserve-scroll>
        <slot></slot>
    </inertia-link>
</template>

<script>
export default {
    props: ['active', 'href', 'as'],
}
</script>

<style>

</style>
<template>
    <button :class="classes">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: ['active', 'href', 'as'],
}
</script>

<style>

</style>
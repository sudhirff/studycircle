<template>
  <h2 class="intro-y text-lg font-medium mt-10">{{ title }}</h2>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false,
            default: 'Page'
        }
    }

}
</script>

<style>

</style>
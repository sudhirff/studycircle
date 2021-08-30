<template>
    <div :id="type+'-success-notification-content'"
        class="toastify-content hidden flex"
    >
        <CheckCircleIcon class="text-theme-20" />
        <div class="ml-4 mr-4">
            <div class="font-medium">{{ message }}!</div>
            <div class="text-gray-600 mt-1">
                {{ messageDesc }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: true,
            default: 'success'
        },
        message: {
            type: String,
            required: false,
            default: 'In progress',
        },
        messageDesc: {
            type: String,
            required: false,
            default: 'In progress'
        }
    }

}
</script>

<style>

</style>
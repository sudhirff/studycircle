<template>
    <div>
        <div class="backdrop" @click="$emit('close')"></div>
        <dialog open>
            <header>
                
                <slot name="header">
                    <h2>{{ title }}</h2>
                </slot>
                <a href="javascript:;" @click="$emit('close')" class="text-right ">
                     <div class="icon closeIcon">
                        <i class="fa fa-close"></i>
                    </div>
                </a>
            </header>
            <section>
                <slot></slot>
            </section>
        </dialog>
    </div>
</template>

<script>
export default {
    emits: ['close'],
    props: {
        title: {
            type: String,
            required: false,
            default: "Title here",
        }
    }
}
</script>

<style scoped>
div.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 50;
}

dialog {
    position: fixed;
    top: 15vh;
    left: 10%;
    width: 80%;
    z-index: 100;
    border-radius: 12px;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 0;
    margin: 0;
    overflow: hidden;
}

header {
    min-height: 70px;
    background-color: #057fd7;
    color: white;
    width: 100%;
    padding: 0.5rem;
}

header h2 {
    margin: 0;
    color: white;
}

section {
    padding: 1rem;
    overflow-y: scroll;
    scroll-behavior: auto;
    max-height: 500px;
}

menu {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    margin: 0;
}

@media (min-width: 768px) {
    dialog {
        left: calc(40% - 20rem);
        width: 60rem;
    }
}

.closeIcon {
    color: #FFFFFF;
    margin-top: -40px;
    margin-right: 10px;
}
</style>
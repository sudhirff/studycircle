import { onMounted } from 'vue'


export default function useCreateUpdate(options) {

    onMounted(() => {
        cash("#"+options.modalBoxId).modal("show");
    });

    function closeModal() {
        cash("#"+options.modalBoxId).modal("hide");
        options.context.emit('closeComp');
        document.getElementById(options.modalBoxId).remove();

        Toastify({
            node: cash("#success-notification-content")
            .clone()
            .removeClass("hidden")[0],
            duration: -1,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true
        }).showToast();
            
    }

    return {
        closeModal
    }
};
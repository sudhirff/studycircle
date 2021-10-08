import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default function useOnePageCrud(options) {
    const store = useStore();
    
    // We will declare all the refs and reactives those are used to show index/listing first.
    const params = reactive({
        page: 0,
        keyword: '',
        sort: 'desc',
        field: 'id',
    });
    
    const isLoading = ref(false);

    onMounted(() => {
        loadItems();
    });

    async function loadItems() {
        isLoading.value = true;
        try {
            await store.dispatch(options.fetch, params);
            isLoading.value = false;
        } catch (error) {
            error = error.message || 'Something went wrong!';
        }
        isLoading.value = false;
    }

    // After items are fetched, we have to get all the items using gettters
    
    const items = computed(function () {
        const getItems = store.getters[options.getter];
        if (getItems.data !== undefined) {
            if (getItems.data.length > 0)
            return getItems;
        }
        return false;
    });
    
    // Pagination functionality
    function paginate(page) {
        params.page = page;
        loadItems();
    }

    // Search functionality
    function search(srchTxt) {
        params.page = 0,
        params.keyword = srchTxt;
        loadItems();
    }

    // Sort functionality
    function sort(sortArray) {
        params.field = sortArray[0];
        params.sort = sortArray[1];
        loadItems();
    }

    // Now we will add variables and functions required for add/edit functionality.
    const submitted = ref(false);
    const isErrored = ref(false);
    const message = ref('');
    const selectedItem = ref();
    const editMode = ref(false);

    // This will do all the validation those are passed through parent.
    const v$ = useVuelidate (options.rules, options.module);
    
    // Submit takes care everything after form is submitted
    async function submit() {
        submitted.value = true;

        v$.value.$validate(); // checks all inputs

        if (!v$.value.$error) {
            isLoading.value = true;
            try {
                if (editMode.value === true) {
                    await store.dispatch(options.update, options.module);
                    message.value = options.module + " updated successfully.";
                } else {
                    await store.dispatch(options.create, options.module);
                    message.value = options.module +  " created successfully.";
                }

                isLoading.value = false;
                submitted.value = false;
                //alert(message.value);
                clearForm();
            } catch(e) {
                isLoading.value = false;
                isErrored.value = true;
                message.value = "This field is already taken.";
            }
        } else {
            // if ANY fail validation
            return ;
        }
    }

    // Clears all the fields of form
    
    function clearForm(edit = false) {
        editMode.value = edit;
        var elements = document.getElementsByClassName('bg-gray-200');
        while(elements.length > 0){
            elements[0].classList.remove('bg-gray-200');
        }
        course.id = '',
        course.type_id = '';
        course.name = '';
        course.course_code = '';
        course.tags = [];
        course.language_id = 1;
    }
    // Finally return all the variables those are required in your vue.
    return {
        loadItems,
        items,
        paginate,
        search,
        sort
    }
}
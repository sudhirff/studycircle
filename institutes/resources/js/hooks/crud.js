import { ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';

export default function useCrud(options) {
    const store = useStore();
    const isLoading = ref(false);
    
    // All index/listing related
    const params = reactive({
        page: 0,
        keyword: '',
        sort: 'desc',
        field: 'id',
    });

    const fetch = async() => {
        clearForm();
        isLoading.value = true;
        await store.dispatch(options.fetch, params);
        isLoading.value = false;
    }

    const items = computed(function () {
        const getItems = store.getters[options.getters];
        if (getItems.data !== undefined) {
            if (getItems.data.length > 0) {
                return getItems;
            }
        }
        return false;
    });

    function paginate(page) {
        params.page = page;
        fetch();
    }

    function search(srchTxt) {
        params.page = 0,
        params.keyword = srchTxt;
        fetch();
    }

    function sort(sortArray) {
        params.field = sortArray[0];
        params.sort = sortArray[1];
        fetch();
    }
    
    // All add/edit related
    
    const submitted = ref(false);
    const isErrored = ref(false);
    const message = ref('');
    const editMode = ref(false);
    
    const v$ = useVuelidate (options.rules, options.form);

    const submit = async() => {
        submitted.value = true;

        v$.value.$validate(); // checks all inputs

        if (!v$.value.$error) {
           
            isLoading.value = true;
            
            try {
                if (editMode.value === true) {
                    await store.dispatch(options.update, options.form);
                    message.value = options.moduleName+ " updated successfully.";
                } else {
                    await store.dispatch(options.create, options.form);
                    message.value = options.moduleName+ " created successfully.";
                }

                isLoading.value = false;
                submitted.value = false;
            } catch(e) {
                isLoading.value = false;
                isErrored.value = true;
                message.value = '';
                for (const key in e.response.data.errors) {
                    message.value += e.response.data.errors[key][0] + ' ';
                }
            }
        } else {
            // if ANY fail validation
            return ;
        }
    }

    function editItem(item) {
        clearForm(true);
        var elements = document.getElementsByClassName('bg-gray-200');
        while(elements.length > 0){
            elements[0].classList.remove('bg-gray-200');
        }
        document.getElementById('list-'+item.id).className = "bg-gray-200";
        
        editMode.value = true;
        Object.assign(options.form, item);
        
    }

    const clearForm = async() => {
        var elements = document.getElementsByClassName('bg-gray-200');
        while(elements.length > 0){
            elements[0].classList.remove('bg-gray-200');
        }
        editMode.value = false;
        Object.assign(options.form, options.initialState);
    }

    // All delete related
    const removeItem = async(item) => {
        if (confirm('Are you sure, you want remove this item?')) {
            await store.dispatch(options.delete, item.id);
            fetch();
        }
        return ;
    }

    return {
        items,
        fetch,
        paginate,
        search,
        sort, 
        params,
        submitted,
        isLoading,
        isErrored,
        message,
        submit,
        v$,
        editItem,
        editMode,
        clearForm,
        removeItem
    }
}
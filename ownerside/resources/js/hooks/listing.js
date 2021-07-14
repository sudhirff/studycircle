import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default function useListing(options) {
    const store = useStore();
    const isLoading = ref(false);

    const selectedComponent = ref(null);
    const selectedItem = ref(null);
    const moduleName = options.moduleName;
    
    // Here we will fetch all the users.
    loadItems();

    async function loadItems() {
        isLoading.value = true;
        try {
            await store.dispatch(options.listDispatch);
            isLoading.value = false;
        } catch (error) {
            error = error.message || 'Something went wrong!';
        }
        isLoading.value = false;
    }

    // After items are fetched, we have to get all the items using gettters
    const items = computed(function () {
        return store.getters[options.listGetter];
    });

    
    // Now, all the items are listed.
    // We now have to show, create, edit, delete modal box according to the events we get.
    function selectComponent(comp) {
        selectedComponent.value = comp
    }
    
    // Code to open a modal box of type create, edit, delete
    // Params needed in this function is 'Component name' and 'id' of that modal box
    function openModal(compName, item = null)
    {
        selectComponent(compName);
        if (item !== null) {
            selectedItem.value = item;
        }
    }

    // Code to remove component completely from DOM
    function removeComponent() {
        selectedComponent.value = null;
        selectedItem.value = null;
    }
    
    // Delete
    async function deleteItem(itemId) {
        removeComponent();
        try {
            await store.dispatch(options.deleteDispatch, itemId);
        } catch (error) {
            error = error.message || 'Something went wrong!';
        }
    }
    return {
        isLoading,
        items,
        selectedComponent,
        deleteItem,
        openModal,
        removeComponent,
        selectedItem,
        moduleName
    };
};
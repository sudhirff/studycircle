export default {
    FETCH_PERMISSIONS(state, payload) {
        state.permissions = payload;
    },
    CREATE_PERMISSION(state, permission)
    {
        state.permissions.unshift(permission.permission)
    },
    EDIT_PERMISSION(state, payload) {
        state.permission = payload;
    },

    DELETE_PERMISSION(state, id) {
        let index = state.permissions.findIndex(item => item.id === id)
        state.permissions.splice(index, 1)
    },

    UPDATE_PERMISSION(state, permission)
    {
        let index = state.permissions.findIndex(item => item.id === permission.id);
        state.permissions[index] = permission;
    },

    FETCH_PERMISSIONS_COUNT(state, count) {
        state.permission_count = count;
    },

    FETCH_PERMISSIONS_MODULE_WISE(state, payload) {
        state.module_wise_permissions = payload;
    }
};
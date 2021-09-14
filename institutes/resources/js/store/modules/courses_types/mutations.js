export default {
    FETCH_PERMISSIONS(state, payload) {
        state.permissions = payload;
    },
    CREATE_COURSES_TYPE(state, coursesType)
    {
        state.coursesType.unshift(coursesType.coursesType)
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
};
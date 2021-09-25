export default {
    FETCH_COURSES_TYPES(state, payload) {
        state.coursesTypes = payload;
    },
    COURSES_TYPE_RESOURCE(state, payload) {
        state.resources = payload;
    },
    COURSES_TYPE_CURRENT_PAGE(state, payload) {
        state.currentPage = payload;
    },
    CREATE_COURSES_TYPE(state, coursesType)
    {
        state.coursesTypes.data.unshift(coursesType.coursesType)
    },
    EDIT_COURSES_TYPE(state, payload) {
        state.coursesType = payload;
    },

    DELETE_COURSES_TYPE(state, id) {
        let index = state.coursesTypes.findIndex(item => item.id === id)
        state.coursesTypes.splice(index, 1)
    },

    UPDATE_COURSES_TYPE(state, courseType)
    {
        let index = state.coursesTypes.data.findIndex(item => item.id === courseType.id);
        state.coursesTypes.data[index] = courseType;
    },
};
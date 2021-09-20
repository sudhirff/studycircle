import axios from "axios"

export default {
    // This action is used to fetch all the permissions present in database
    async fetch(context) {
        const response = await axios.get('/api/v1/courses_type') ;

        if (response.status != 200) {
            const error = new Error('Failed to fetch course type')
            throw error;
        }
        context.commit('FETCH_COURSES_TYPES', response.data);
    },
    
    async create(context, coursesType) {
        const response = await axios.post('/api/v1/courses_type', coursesType) ;

        if (response.status != 200) {
            const error = new Error('Failed to create course type')
            throw response.data.message;
        }
        context.commit('CREATE_COURSES_TYPE', response.data);
    },

    // This action is used to fetch only selected permission
    async editPermission(context, id) {
        const response = await axios.get(`/api/v1/permissions/${id}/edit`);

        if (response.status != 200) {
            const error = new Error('Failed to fetch permission')
            throw error;
        }
        context.commit('EDIT_PERMISSION', response.data.permission);
    },

    // After permission submits the form, permission information must be updated in database.
    async updatePermission(context, permission) {
        const response = await axios.put(`/api/v1/permissions/${permission.id}`, permission);

        if (response.status != 200) {
            const error = new Error('Failed to update permission')
            throw error;
        }

        context.commit('UPDATE_PERMISSION', permission);
    },

    // This action is used to delete permission from serve.
    async deletePermission(context, id) {
        const response = await axios.delete(`/api/v1/permissions/${id}`);
        if (response.status != 200) {
            const error = new Error('Failed to delete permission')
            throw error;
        }
        context.commit('DELETE_PERMISSION', id);
    },
};
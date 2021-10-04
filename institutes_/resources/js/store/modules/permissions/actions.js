import axios from "axios"

export default {
    // This action is used to fetch all the permissions present in database
    async fetchPermissions(context) {
        const response = await axios.get('/api/v1/permissions') ;

        if (response.status != 200) {
            const error = new Error('Failed to fetch permissions')
            throw error;
        }
        context.commit('FETCH_PERMISSIONS', response.data);
    },
    
    async createPermission(context, permission) {
        const response = await axios.post('/api/v1/permissions', permission) ;

        if (response.status != 200) {
            const error = new Error('Failed to create permissions')
            throw response.data.message;
        }
        context.commit('CREATE_PERMISSION', response.data);
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


    async permissionCount(context) {
        const response = await axios.get('/api/v1/permissions') ;

        if (response.status != 200) {
            const error = new Error('Failed to fetch permissions')
            throw error;
        }
        
        context.commit('FETCH_PERMISSIONS_COUNT', response.data.length);
    },


    async modules(context) {
        const response = await axios.get('/api/v1/permissions/modules') ;

        if (response.status != 200) {
            const error = new Error('Failed to fetch permissions')
            throw error;
        }

        context.commit('FETCH_PERMISSIONS_MODULE_WISE', response.data);
    }
};
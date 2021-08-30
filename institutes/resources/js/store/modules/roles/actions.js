import axios from "axios"

export default {
    // This action is used to fetch all the roles present in database
    async fetchRoles(context) {
        const response = await axios.get('/api/v1/roles') ;

        if (response.status != 200) {
            const error = new Error('Failed to fetch roles')
            throw error;
        }
        context.commit('FETCH_ROLES', response.data);
    },
    
    async createRole(context, role) {
        const response = await axios.post('/api/v1/roles', role) ;

        if (response.status != 200) {
            const error = new Error('Failed to fetch roles')
            throw error;
        }
        context.commit('CREATE_ROLE', response.data);
    },

    // This action is used to fetch only selected role
    async editRole(context, id) {
        const response = await axios.get(`/api/v1/roles/${id}/edit`);

        if (response.status != 200) {
            const error = new Error('Failed to fetch role')
            throw error;
        }
        context.commit('EDIT_ROLE', response.data.role);
    },

    // After role submits the form, role information must be updated in database.
    async updateRole(context, role) {
        const response = await axios.put(`/api/v1/roles/${role.id}`, role);

        if (response.status != 200) {
            const error = new Error('Failed to update role')
            throw error;
        }

        context.commit('UPDATE_ROLE', role);
    },

    // This action is used to delete role from serve.
    async deleteRole(context, id) {
        const response = await axios.delete(`/api/v1/roles/${id}`);
        if (response.status != 200) {
            const error = new Error('Failed to delete role')
            throw error;
        }
        context.commit('DELETE_ROLE', id);
    },
    
    async checkEmailExists(context, role) {
        return new Promise((resolve, reject) => {
            // Do something here... lets say, a http call using vue-resource
            let apiUrl = `/api/v1/roles/check_email_exists/${role.email}/null`;
            if (role.id != '') {
                apiUrl = `/api/v1/roles/check_email_exists/${role.email}/${role.id}`
            }
            axios.get(apiUrl).then(response => {
                // http success, call the mutator and change something in state
                resolve(response);  // Let the calling function know that http is done. You may send some data back
            }, error => {
                // http failed, let the calling function know that action did not work out
                reject(error);
            })
        })
    }
};
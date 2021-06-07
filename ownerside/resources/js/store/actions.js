const { default: axios } = require("axios")

let actions = {
    /** All the user related actions */
    createUser({commit}, user) {
        axios.post('/api/users', user)
            .then(res => {
                commit('CREATE_USER', res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    editUser({commit}, id) {
        axios.get(`/api/users/${id}/user`)
            .then(response => {
                commit('EDIT_USER', response.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    updateUser({commit}, user) {
        axios.put('/api/users', user)
            .then(response => {
                commit('UPDATE_USER', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    fetchUsers({commit}) {
        axios.get('/api/users')
            .then(response => {
                commit('FETCH_USERS', response.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
    deleteUser({commit}, user) {
        axios.delete(`/api/users/${user.id}`)
            .then(response => {
                if (response.data.success == true)
                    commit('DELETE_USER', user)
            }).catch(err => {
                console.log(err)
            })
    },
    checkEmailExists({commit}, user) {
        return new Promise((resolve, reject) => {
            // Do something here... lets say, a http call using vue-resource
            axios.get(`/api/users/check_email_exists/${user.email}`).then(response => {
                // http success, call the mutator and change something in state
                resolve(response);  // Let the calling function know that http is done. You may send some data back
            }, error => {
                // http failed, let the calling function know that action did not work out
                reject(error);
            })
        })
        /*axios.get(`/api/users/check_email_exists/${user.email}`)
            .then(response => {
                commit('FETCH_EMAIL_EXISTS', response)
            })
            .catch(err => {
                console.log(err)
            })*/
    }
    /** End of user related actions */
}

export default actions
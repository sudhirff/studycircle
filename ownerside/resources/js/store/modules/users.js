export default {
    state() {
        return {
            users: [],
        }
    },
    mutations: {
        CREATE(state, payload) {

        },
        UPDATE(state, payload) {

        },
        DELETE(state, payload) {

        }
    },
    actions: {
        createUser(context, payload) {
            context.commit('CREATE', payload);
        },
        updateUser(context, payload) {
            context.commit('UPDATE', payload);
        },
        deleteUser(context, payload) {
            context.commit('DELETE', payload);
        }
    },
    getters: {
        users() {
            return state.users;
        }
    }
}
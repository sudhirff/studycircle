export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.isLoggedIn = true;
        state.userId = payload.userId;
    },
    setAutoLogout(state) {
        state.token = null;
        state.isLoggedIn = false;
        state.userId = null;
    }
};
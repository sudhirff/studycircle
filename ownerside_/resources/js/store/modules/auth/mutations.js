export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.authUser = payload.user;
        state.isLoggedIn = true;
    },
    setAutoLogout(state) {
        state.isLoggedIn = false;
    }
};
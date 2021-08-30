export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.isLoggedIn = payload.isLoggedIn;
    },
    setAutoLogout(state) {
        state.didAutoLogout = true;
    }
};
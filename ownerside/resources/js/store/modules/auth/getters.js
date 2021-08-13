export default {    
    authUser(state) {
        return state.authUser;
    },
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        return !!state.token;
    },
    isLoggedIn(state) {
        return state.isLoggedIn;
    }
}
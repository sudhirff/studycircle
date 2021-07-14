let mutations = {
    /* All the user related mutations are defined here */
    CREATE_USER(state, user)
    {
        state.users.unshift(user.user)
    },
    EDIT_USER(state, user)
    {
        state.user = user;
    },
    UPDATE_USER(state, user)
    {
        let index = state.users.findIndex(item => item.id === user.id)

        state.users(index, user)
        //state.users.unshift(user.user)
    },
    
    FETCH_USERS(state, users)
    {
        return state.users = users
    },
    DELETE_USER(state, user)
    {
        let index = state.users.findIndex(item => item.id === user.id)
        state.users.splice(index, 1)
    },
    FETCH_EMAIL_EXISTS(state, user) {
        return state.exists = user
    },
    /* End of user related mutations */
    
}

export default mutations
import axios from "axios";

export default {
    //Action for login method
    async login(context, payload)
    {
        const csrfRes = await axios.get('/sanctum/csrf-cookie');
        if (csrfRes.status >= 200 || csrfRes.status <= 205) {
            const loginResponse = axios.post('/login', payload);
            console.log(loginResponse);
        }
            /*.then(response => {
                const loginResponse = axios.post('/login', this.payload);
                console.log(loginResponse);*/
                /*if (loginResponse.status != 200) {
                    const error = new Error('These credentials do not match our records.')
                    throw error;
                }*/

                /*context.commit('setUser', loginResponse.data);
            });*/
    },
    //Action for logout method
    async logout()
    {

    }
}
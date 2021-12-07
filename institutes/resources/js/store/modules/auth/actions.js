import axios from "axios";
let timer;

export default {
    //Action for login method
    async login(context, payload)
    {
        const csrfRes = await axios.get('/sanctum/csrf-cookie');
        if (csrfRes.status >= 200 || csrfRes.status <= 205) {
            const loginResponse = await axios.post('/login', payload);
            if (loginResponse.status != 200) {
                throw 'Oops, something went wrong. Please try again.';
            }
            if (loginResponse.data.success === false) {
                const error = new Error(loginResponse.data.message);
                throw error;
            }

            const expiresIn = +loginResponse.data.expiresIn * 10000;
            
            // const expiresIn = 5000;
            const expirationDate = new Date().getTime() + expiresIn;

            localStorage.setItem('token', loginResponse.data.token);
            localStorage.setItem('tokenExpiration', expirationDate);
            localStorage.setItem('userId', loginResponse.data.user.id);

            timer = setTimeout(function() {
                context.dispatch('autoLogout');
            }, expiresIn);

                        
            context.commit('setUser', loginResponse.data);
        }
    },
    
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
    
        const expiresIn = +tokenExpiration - new Date().getTime();
    
        if (expiresIn < 0) {
          return;
        }
    
        timer = setTimeout(function() {
            //context.dispatch('autoLogout');
        }, expiresIn);
    
        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
                isLoggedIn: true,
            });
        }
    },
    //Action for logout method
    async logout(context) {
        const csrfRes = await axios.get('/sanctum/csrf-cookie');
        if (csrfRes.status >= 200 || csrfRes.status <= 205) {
            const logoutResponse = await axios.post('/logout');
            if (logoutResponse.status != 200) {
                throw 'Oops, something went wrong. Please try again.';
            }
            if (logoutResponse.data.success === false) {
                const error = new Error(logoutResponse.data.message);
                throw error;
            }

            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('tokenExpiration');

            clearTimeout(timer);

            context.commit('setUser', {
                token: null,
                userId: null,
                isLoggedIn: false,
            });
        }
        
    },
    autoLogout(context) {
        context.commit('setAutoLogout');
        context.dispatch('logout');
    },
}
import axios from "axios";

export default {
    //Action for login method
    async login(context, payload)
    {
        axios.get('/sanctum/csrf-cookie')
            .then(response => {
            axios.post('/login', payload)
              .then(response => {
                  submitted.value = false;
                  router.go('/dashboard');
              })
              .catch(function () {
                  submitted.value = false;
                  error.value = true;
                  message.value = 'These credentials do not match our records.';
              });
          })
          .catch(function (error) {
            console.error("Got nothing from server. Prompt user to check internet connection and try again")
          });
    },
    //Action for logout method
    async logout()
    {

    }
}
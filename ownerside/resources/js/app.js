import './bootstrap'
import { createApp } from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'
import globalComponents from './global-components'
import utils from './utils'

import Toastify from 'toastify-js'

// SASS Theme
//import './assets/sass/app.scss'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(Toastify)

globalComponents(app)
utils(app)

app.mount('#app')

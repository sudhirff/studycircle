import { createStore } from 'vuex';

import sideMenu from './side-menu';

import rootGetters from './getters';
import rootActions from './actions';
import rootMutations from './mutations';
import userModule from './modules/users/index.js';
import instituteModule from './modules/institutes/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    auth: authModule,
    sideMenu,
    users: userModule,
    institutes: instituteModule,
  },
  state() {
    return {
      isLoggedIn: false,
    }
  },
  getters: rootGetters,
  actions: rootActions,
  mutations: rootMutations,
})

export function useStore() {
  return store
}

export default store

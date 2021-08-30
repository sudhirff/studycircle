import { createStore } from 'vuex';

import sideMenu from './side-menu';

import rootGetters from './getters';
import rootActions from './actions';
import rootMutations from './mutations';
import authModule from './modules/auth/index.js';
import userModule from './modules/users/index.js';
import permissionModule from './modules/permissions/index.js';
import roleModule from './modules/roles/index.js';

const store = createStore({
  modules: {
    sideMenu,
    auth: authModule,
    users: userModule,
    permissions: permissionModule,
    roles: roleModule,
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

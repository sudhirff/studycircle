import { createStore } from 'vuex'

import sideMenu from './side-menu'

import rootGetters from './getters'
import rootActions from './actions'
import rootMutations from './mutations'
import userModules from './modules/users/index.js'

const store = createStore({
  modules: {
    users: userModules,
    sideMenu
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

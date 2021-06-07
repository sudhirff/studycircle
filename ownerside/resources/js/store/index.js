import { createStore } from 'vuex'
//import main from './main'
import sideMenu from './side-menu'

import state from "./state"
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const store = createStore({
  state,
  getters,
  actions,
  mutations,
  modules: {
    //main,
    sideMenu,
  }
})

export function useStore() {
  return store
}

export default store

import { createStore } from 'vuex'
import sideMenu from './side-menu'

const store = createStore({
  modules: {
    sideMenu
  }
})

export function useStore() {
  return store
}

export default store

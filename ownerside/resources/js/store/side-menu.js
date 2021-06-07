const state = () => {
  return {
    menu: [
      {
        icon: 'ActivityIcon',
        pageName: 'dashboard',
        title: 'Dashboard',
      },
      {
        icon: 'HomeIcon',
        pageName: 'institutes',
        title: 'Institutes',
      },
      {
        icon: 'UsersIcon',
        pageName: 'users',
        title: 'User Management',
      },
    ]
  }
}

// getters
const getters = {
  menu: state => state.menu
}

// actions
const actions = {}

// mutations
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

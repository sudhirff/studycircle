const state = () => {
  return {
    menu: [
      {
        icon: 'ActivityIcon',
        pageName: 'dashboard',
        title: 'Dashboard',
      },
      {
        icon: 'UsersIcon',
        pageName: 'users',
        title: 'User Management',
        subMenu: [
          {
            icon: 'HomeIcon',
            pageName: 'permissions',
            title: 'Permissions'
          },
          {
            icon: 'HomeIcon',
            pageName: 'roles',
            title: 'Roles'
          },
          {
            icon: 'HomeIcon',
            pageName: 'users',
            title: 'Users'
          }
        ]
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

const state = () => {
    return {
        menu: [
            {
                icon: 'HomeIcon',
                pageName: 'Dashboard',
                title: 'Dashboard'
            },
            /*{
                icon: 'InboxIcon',
                pageName: 'side-menu-inbox',
                title: 'Inbox',
            }*/
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
  
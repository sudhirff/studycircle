import { createStore } from 'vuex';

import sideMenu from './side-menu';

import rootGetters from './getters';
import rootActions from './actions';
import rootMutations from './mutations';
import authModule from './modules/auth/index.js';
import userModule from './modules/users/index.js';
import permissionModule from './modules/permissions/index.js';
import roleModule from './modules/roles/index.js';
import courseCategoryModule from './modules/course_categories/index.js';
import coursesTypeModule from './modules/courses_types/index.js';
import subjectModule from './modules/subjects/index.js';

const store = createStore({
  modules: {
    sideMenu,
    auth: authModule,
    users: userModule,
    permissions: permissionModule,
    roles: roleModule,
    courseCategories: courseCategoryModule,
    coursesType: coursesTypeModule,
    subjects: subjectModule,
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

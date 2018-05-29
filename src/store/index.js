import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import getters from './getters'
import tagsView from './modules/tagsView'
import task from './modules/task'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        tagsView,
        task
    },
    getters
})

export default store
import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import getters from './getters'
import tagsView from './modules/tagsView'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        tagsView
    },
    getters
})

export default store
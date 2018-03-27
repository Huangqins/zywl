import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Entry = (resolve) => {
    import('components/entry/index').then(module => {
        resolve(module)
    })
}

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Entry
        }
    ]
})
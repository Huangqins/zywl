import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const Entry = (resolve) => {
//     import('components/entry/index').then(module => {
//         resolve(module)
//     })
// }

const Regitser = (resolve) => {
    import('components/entry/register').then(module => {
        resolve(module)
    })
}
const Login = (resolve) => {
    import('components/entry/login').then(module => {
        resolve(module)
    })
}

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Regitser
        },
        {
            path: '/register',
            component: Regitser
        },
        {
            path: '/login',
            component: Login
        }
    ]
})
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
VueRouter.prototype.goBack = function () {
    this.isBack = true
    window.history.go(-1)
}

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
const Welcome = (resolve) => {
    import('components/guide/welcome').then(module => {
        resolve(module)
    })
}
const Assetadd = (resolve) => {
    import('components/guide/assetAdd').then(module => {
        resolve(module)
    })
}
const Assetset = (resolve) => {
    import('components/guide/assetSet').then(module => {
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
        },
        {
            path: '/welcome',
            component: Welcome
        },
        {
            path: '/assetAdd',
            component: Assetadd
        },
        {
            path: '/assetSet',
            component: Assetset
        }

    ]
})
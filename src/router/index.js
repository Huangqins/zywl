import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
VueRouter.prototype.goBack = function () {
    this.isBack = true
    window.history.go(-1)
}

const Historydata = (resolve) => {
    import('components/historydata/datamanage').then(module => {
        resolve(module)
    })
}

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
const Sysinfo = (resolve) => {
    import('components/guide/sysInfo').then(module => {
        resolve(module)
    })
}
const Taskhomepage = (resolve) => {
    import('components/taskpage/taskhomepage').then(module => {
        resolve(module)
    })
}
const Editpassword = (resolve) => {
    import('components/entry/editpassword').then(module => {
        resolve(module)
    })
}
const Taskexecution = (resolve) => {
    import('components/taskpage/taskexecution').then(module => {
        resolve(module)
    })
}

const Cloud = (resolve) => {
    import('components/taskpage/cloud').then(module => {
        resolve(module)
    })
}
const Piechart = (resolve) => {
    import('components/taskpage/piechart').then(module => {
        resolve(module)
    })
}
const Holedetail = (resolve) => {
    import('components/hole/holedetail').then(module => {
        resolve(module)
    })
}
const Zhexiantu = (resolve) => {
    import('components/taskpage/zhexiantu').then(module => {
        resolve(module)
    })
}
const Panel = (resolve) => {
    import('components/layout/panel').then(module => {
        resolve(module)
    })
}
const Force = (resolve) => {
    import('components/chart/force').then(module => {
        resolve(module)
    })
}
const Particles = (resolve) => {
    import('components/layout/particles').then(module => {
        resolve(module)
    })
}

export default new VueRouter({
    // mode: 'history',
    routes: [
        { path: '*', redirect: '/404' },
        { path: '/404', component: () => import('components/views/404') },
        {
            path: '/',
            redirect: '/login'
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
        },
        {
            path: '/sysInfo',
            component: Sysinfo
        },
        {
            path: '/taskhomepage',
            component: Taskhomepage
        },
        {
            path: '/editpassword',
            component: Editpassword
        },
        {
            path: '/taskexecution',
            component: Taskexecution
        },
        {
            path: '/cloud',
            component: Cloud
        },
        {
            path: '/piechart',
            component: Piechart
        },
        {
            path: '/holedetail/:id',
            component: Holedetail
        },
        {
            path: '/zhexiantu',
            component: Zhexiantu
        },
        {
            path: '/datamanage',
            component: Historydata
        },
        {
            path: '/panel',
            component: Panel
        },
        {
            path: '/force',
            component: Force
        },
        {
            path: '/particles',
            component: Particles
        }
    ]
})
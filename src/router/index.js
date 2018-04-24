import Vue from 'vue'
import VueRouter from 'vue-router'
import assetsRoutes from './module/assets'
import { getUserName } from '@/utils/auth'

Vue.use(VueRouter)
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
    import('components/chart/zhexiantu').then(module => {
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
const Taskexecution = (resolve) => {
    import('components/taskpage/taskexecution').then(module => {
        resolve(module)
    })
}
const Process = (resolve) => {
    import('components/views/task/process').then(module => {
        resolve(module)
    })
}
const Holecloud = (resolve) => {
    import('components/views/task/holecloud').then(module => {
        resolve(module)
    })
}
const Leaks = (resolve) => {
    import('components/views/task/leaks').then(module => {
        resolve(module)
    })
}
const AssetsManage = (resolve) => {
    import('components/views/assets/assetsManage').then(module => {
        resolve(module)
    })
}
const AssetManagement = (resolve) => {
    import('components/views/assets/assetManagement').then(module => {
        resolve(module)
    })
}
const Kbinfo = (resolve) => {
    import('components/views/knowledgebase/kbinfo').then(module => {
        resolve(module)
    })
}
const router = new VueRouter({
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
            name: 'assetSet',
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
        },
        {
            path: '/assetManagement',
            component: AssetManagement
        },
        {
            path: '/kbinfo',
            component: Kbinfo
        },
        {   
            name: 'taskexecution',
            path: '/taskexecution',
            component: Taskexecution,            
            children: [
                {
                    path: '',
                    // component: Process,
                    components: {
                        default: Process,
                        // left: Cloud,
                    }
                },
                {
                    path: 'holecloud',
                    // component: Holecloud
                    components: {
                        // left: ,
                        default: Holecloud
                    }
                },
                {   
                    name: 'leaks',
                    path: 'leaks',
                    components: {
                        left: Cloud,
                        default: Leaks
                    }
                },
                {
                    path: 'assetsManage',
                    // component: AssetsManage
                    components: {
                        // left: Cloud,
                        default: AssetsManage
                    }
                },
                {
                    path: 'kbinfo',
                    components: {
                        default: Kbinfo
                    }
                },
                {
                    path: 'assetManagement',
                    components: {
                        default: AssetManagement
                    }
                },
                {
                    path: 'assetSet',
                    components: {
                        default: Assetset
                    }
                },




            ]
        }
    ].concat(assetsRoutes)
})

export default router
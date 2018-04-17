import Vue from 'vue'
import VueRouter from 'vue-router'
import assetsRoutes from './module/assets'
import { Modal } from 'iview'
import { getUserName } from '@/utils/auth'

Vue.use(VueRouter)
const Historydata = (resolve) => {
    import('components/historydata/datamanage').then(module => {
        resolve(module)
    })
}

const isAssetOne = () => {
    return `欢迎使用智刃安全攻防平台,距您上次进行攻防测试已经过了XXX天XXX小时XXX分钟，建议进行测试的资产为XXX`;
}
const isAssetTwo = () => {
    return `欢迎使用智刃安全攻防平台,目前网络空间安全等级为XXX，安全情报监控显示，XXX资产暴露XXX问题，可能存在问题的资产有XXX。
    是否要进行安全测试？`
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
            name: 'taskexecution',
            path: '/taskexecution',
            component: Taskexecution,
            beforeEnter: (to, from, next) => {
                console.log(to)
                if (from.fullPath === '/login') {
                    Modal.info({
                        'title': `您好,${getUserName()}`,
                        'content': to.params.firstLogin === 1 ? isAssetOne() : isAssetTwo(),
                        'onOk': () => {
                            if (to.params.firstLogin === 1) {
                                next()
                            }else {
                                next('/assets/assetsManage')
                            }
                        },
                        'onCancel': () => {
                            if (to.params.firstLogin === 0) {
                                next('/taskhomepage')
                            }else{
                                next()
                            }
                        }
                    })
                }
                next()
            },
            // beforeRouteLeave: (to, from ,next) => {
            //     console.log('1111')
            //     Modal.remove()
            // },
            children: [
                {
                    path: '',
                    component: Process
                },
                // {   
                //     name: 'process',
                //     path: 'process',
                //     component: Process
                // },
                {
                    path: 'holecloud',
                    component: Holecloud
                },
                {
                    path: 'leaks',
                    component: Leaks
                },
                {
                    path: 'assetsManage',
                    component: AssetsManage
                },



            ]
        }
    ].concat(assetsRoutes)
})

export default router
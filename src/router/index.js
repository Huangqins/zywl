import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  getUserName
} from '@/utils/auth'

Vue.use(VueRouter)

const Historydata = (resolve) => {
  import ('components/historydata/datamanage').then(module => {
    resolve(module)
  })
}
const Homepage = (resolve) => {
  import ('components/views/homepage.vue').then(module => {
    resolve(module)
  })
}
const Regitser = (resolve) => {
  import ('components/entry/register').then(module => {
    resolve(module)
  })
}
const Login = (resolve) => {
  import ('components/entry/login').then(module => {
    resolve(module)
  })
}
const Welcome = (resolve) => {
  import ('components/guide/welcome').then(module => {
    resolve(module)
  })
}
const Assetadd = (resolve) => {
  import ('components/guide/assetAdd').then(module => {
    resolve(module)
  })
}
const Assetset = (resolve) => {
  import ('components/guide/assetSet').then(module => {
    resolve(module)
  })
}
const Sysinfo = (resolve) => {
  import ('components/guide/sysInfo').then(module => {
    resolve(module)
  })
}
const Taskhomepage = (resolve) => {
  import ('components/taskpage/taskhomepage').then(module => {
    resolve(module)
  })
}
const Editpassword = (resolve) => {
  import ('components/entry/editpassword').then(module => {
    resolve(module)
  })
}
const Cloud = (resolve) => {
  import ('components/taskpage/cloud').then(module => {
    resolve(module)
  })
}
const Piechart = (resolve) => {
  import ('components/taskpage/piechart').then(module => {
    resolve(module)
  })
}
const Holedetail = (resolve) => {
  import ('components/hole/holedetail').then(module => {
    resolve(module)
  })
}
const Zhexiantu = (resolve) => {
  import ('components/chart/zhexiantu').then(module => {
    resolve(module)
  })
}
const Panel = (resolve) => {
  import ('components/layout/panel').then(module => {
    resolve(module)
  })
}
const Force = (resolve) => {
  import ('components/chart/force').then(module => {
    resolve(module)
  })
}
// const Particles = (resolve) => {
//     import('components/layout/particles').then(module => {
//         resolve(module)
//     })
// }
// const Taskexecution = (resolve) => {
//     import('components/taskpage/taskexecution').then(module => {
//         resolve(module)
//     })
// }
const Process = (resolve) => {
  import ('components/views/task/process').then(module => {
    resolve(module)
  })
}
const Holecloud = (resolve) => {
  import ('components/views/task/holecloud').then(module => {
    resolve(module)
  })
}
const Leaks = (resolve) => {
  import ('components/views/task/leaks').then(module => {
    resolve(module)
  })
}
const AssetsManage = (resolve) => {
  import ('components/views/assets/assetsManage').then(module => {
    resolve(module)
  })
}
const AssetManagement = (resolve) => {
  import ('components/views/assets/assetManagement').then(module => {
    resolve(module)
  })
}
const Kbinfo = (resolve) => {
  import ('components/views/knowledgebase/kbinfo').then(module => {
    resolve(module)
  })
}
const FirstassetAdd = (resolve) => {
  import ('components/guide/firstassetAdd').then(module => {
    resolve(module)
  })
}
const Mainpage = (resolve) => {
  import ('components/taskpage/mainpage').then(module => {
    resolve(module)
  })
}
const Vulndetail = (resolve) => {
  import ('components/views/task/vulndetail').then(module => {
    resolve(module)
  })
}
const Logs = (resolve) => {
  import ('components/views/systemManage/Logs').then(module => {
    resolve(module)
  })
}
const Authorize = (resolve) => {
  import ('components/views/systemManage/authorize').then(module => {
    resolve(module)
  })
}
const User = (resolve) => {
  import ('components/views/userpage/user').then(module => {
    resolve(module)
  })
}
const Apimanage = (resolve) => {
  import ('components/views/systemManage/apiManage').then(module => {
    resolve(module)
  })
}
const Userinfodetail = (resolve) => {
  import ('components/views/task/userinfodetail').then(module => {
    resolve(module)
  })
}
const Reportmanage = (resolve) => {
  import ('components/views/report/reportManage').then(module => {
    resolve(module)
  })
}
const Updatemanage = (resolve) => {
  import ('components/views/systemManage/updateManage').then(module => {
    resolve(module)
  })
}
const router = new VueRouter({
  // mode: 'history',
  routes: [{
      path: '*',
      redirect: '/404'
    },
    {
      path: '/404',
      component: () =>
        import ('components/views/404')
    },
    {
      path: '/homepage',
      component: Homepage
    },
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
      meta: {
        menuCode: '12'
      },
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
      path: '/assetManagement',
      component: AssetManagement
    },
    {
      meta: {
        menuCode: '17'
      },
      name:"reportManage",
      path: '/reportManage',
      component: Reportmanage
    },
    {
      path: '/kbinfo',
      component: Kbinfo
    },

    {
      meta: {
        menuCode: '13'
      },
      name: "firstassetAdd",
      path: '/firstassetAdd',
      component: FirstassetAdd
    },
    {
      name: "mainpage",
      path: '/mainpage',
      component: Mainpage
    },

    {
      name: 'mainpage',
      path: '/mainpage',
      // redirect: '/taskexecution/assetSet',
      component: Mainpage,
      children: [{
          //任务进度需要任务Id进入
          meta: {
            menuCode: "10",
            title: ''
          },
          name: 'process',
          path: 'process/:target_id',
          component: Process
        },
        {
          meta: {
            title: '漏洞文字云'
          },
          name: 'holecloud',
          path: 'holecloud',
          component: Holecloud
        },
        {
          meta: {
            menuCode: "05",
            title: '风险详情'
          },
          name: 'leaks',
          path: 'leaks',
          component: Leaks
        },
        {
          meta: {
            menuCode: "04",
            title: '风险态势'
          },
          name: 'assetsManage',
          path: 'assetsManage',
          component: AssetsManage
        },
        {
          meta: {
            menuCode: "06",
            title: '知识管理'
          },
          name: 'kbinfo',
          path: 'kbinfo',
          component: Kbinfo
        },
        {
          meta: {
            menuCode: "17",
            title: '报告管理'
          },
          name:'reportManage',
          path: 'reportManage',
          component: Reportmanage 
        },
        {
          meta: {
            menuCode: "03",
            title: '资产码头'
          },
          name:'assetManagement',
          path: 'assetManagement',
          component: AssetManagement 
        },
        {
          meta: {
            menuCode: "02",
            title: "任务调度"
          },
          name: 'assetSet',
          path: 'assetSet',
          component: Assetset
        },
        {
          meta: {
            menuCode: "01",
            title: '首页'
          },
          name: 'homepage',
          path: 'homepage',
          component: Homepage
        },
        {
          meta: {
            menuCode: "14",
            title: '风险详情'
          },
          name: "vulndetail",
          path: 'vulndetail',
          component: Vulndetail
        },
        {
          meta: {
            menuCode: "14",
            title: '漏洞利用详情'
          },
          name: "userinfodetail",
          path: 'userinfodetail',
          component: Userinfodetail
        },
        {
          meta: {
            menuCode: "07",
            title: '日志管理'
          },
          name: "logs",
          path: "logs",
          component: Logs
        },
        {
          meta: {
            menuCode: "08",
            title: 'Api管理'
          },
          name: "apiManage",
          path: 'apiManage',
          component: Apimanage
        },
        {
          meta: {
            menuCode: "09",
            title: '个人信息'
          },
          name: "user",
          path: 'user',
          component: User
        },
        {
          meta: {
            menuCode: "15",
            title: '权限管理'
          },
          name: "authorize",
          path: "authorize",
          component: Authorize
        },        
        {
          meta: {
            menuCode: "16",
            title: '升级管理'
          },
          name: "updateManage",
          path: 'updateManage',
          component: Updatemanage
        }
      ]
    }
  ]
})

export default router

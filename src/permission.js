import router from '@/router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  Message
} from 'iview'
import {
  getToken,
  removeToken
} from '@/utils/auth' // 验权
import store from './store'

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/register' || to.path === '/login') {
    store.commit('REMOVE_TOKEN');
    store.commit('REMOVE_USER_NAME');
    removeToken()
  }
  if (getToken()) {
    next()
  } else {
    if (to.path === '/register' || to.path === '/login') {
      next()
    } else {
      Message.warning({
        content: '没有访问权限请登录',
        top: 50,
        duration: 3
      })
      next('/login')
    }
  }

  // if (getToken() !== 'undefined' && getToken()) {
  //     next()
  // } else {
  //     if (to.path === '/login') {
  //         next()
  //     } else if (to.path === '/') {
  //         next()
  //     } else {
  //         Message.warning({
  //             content:'没有访问权限请登录',
  //             top: 50,
  //             duration: 3
  //         })
  //         next('/login')
  //         NProgress.done()
  //     }
  // }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

import router from '@/router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'iview'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单


router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        console.log('存在')
        // if (to.path === '/login') {
        //     next({ path: '/' })
        // }
        next()
    } 
    else {
        // next({ path: '/login' })
        next()
        console.log()
    }
    NProgress.done()
})
router.afterEach(() => {
    NProgress.done() // 结束Progress
})
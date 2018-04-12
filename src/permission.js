import router from '@/router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'iview'
import { getToken } from '@/utils/auth' // 验权

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken() !== 'undefined' && getToken()) {
        next()
    } else {
        if (to.path === '/login') {
            next()
        } else if (to.path === '/') {
            next()
        } else {
            Message.warning({
                content:'没有访问权限请登录',
                top: 50,
                duration: 3
            })
            next('/login')
            NProgress.done()
        }
    }
})
router.afterEach(() => {
    NProgress.done() // 结束Progress
})
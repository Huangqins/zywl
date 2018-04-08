import axios from 'axios'
import { Message } from 'iview'
import store from '../store'
import { getUserName, getToken } from '@/utils/auth'

// 拦截器
// 请求拦截器
// 创建axios实例
const service = axios.create({
    // baseURL: process.env.BASE_API,
    // baseURL: 'http://192.168.0.107/ZY/',
    timeout: 15000 // 请求超时时间
})

service.interceptors.request.use(config => {
    if (store.getters.token && store.getters.userName) {
        config.headers['token'] = getToken()
        config.headers['userName'] = getUserName()
    }
    return config
}, error => {
    console.log(error) // for debug
    Promise.reject(error)
})
//   response拦截器
service.interceptors.response.use(response => {
    return response.data
    // if (res.result === 0) {
    //     Message.success({
    //         top: 50,
    //         duration: 3,
    //         content: '操作成功'
    //     })
    //     return response.data
    // } else if (res.result === 2) {
    //     return response.data
    // }
}, error => {
    console.log('err' + error)// for debug
    Message.error({
        top: 50,
        duration: 3,
        content: '操作失败'
    })
    return Promise.reject(error)
})

export default service


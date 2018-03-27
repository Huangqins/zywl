import axios from 'axios'
import { Message } from 'iview'

// 拦截器
// 请求拦截器
// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000 // 请求超时时间
})

service.interceptors.request.use(config => {
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})
//   response拦截器
service.interceptors.response.use(response => {
    const res = response.data
    //   code为200 成功
    if (res.code === 200) {
        Message.success({
            top: 50,
            duration: 3,
            content: '操作成功'
        })
        return response.data
    } else {
        return Promise.reject('error')
    }
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


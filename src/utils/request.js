import axios from 'axios'
import {
  Message
} from 'iview'
import store from '../store'
import router from '../router'
import {
  getUserName,
  getToken
} from '@/utils/auth'


// 拦截器
// 请求拦截器
// 创建axios实例
const baseURL = location.origin
// 取消Token(解决重复发送相同请求)
// let pending = []; 
// let cancelToken = axios.CancelToken;
// let removePending = (config) => {
//   for (let p in pending) {
//     if (pending[p].u === config.url + '&' + JSON.stringify(config.data)) {
//       pending[p].f(); 
//       pending.splice(p, 1); 
//     }
//   }
// }

// const source = CancelToken.source();
const service = axios.create({
  // baseURL: process.env.BASE_API,
  // baseURL: 'http://192.168.0.107/ZY/',
  timeout: 15000, // 请求超时时间,
})
// 保存请求路径参数
let requestPath = ''
service.interceptors.request.use(config => {
//   removePending(config); //在一个ajax发送前执行一下取消操作
  requestPath = config.url
//   config.cancelToken = new cancelToken((c) => {
//     pending.push({
//       u: config.url + '&' + JSON.stringify(config.data),
//       f: c
//     });
//   });
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
  if (requestPath.indexOf('checkUserName') > -1 && response.data.result === 1) {
    Message.error({
      top: 50,
      duration: 3,
      content: '用户名已存在'
    })
  } else if (response.data.result === 1 || response.data.result === 3) {
    Message.error({
      top: 50,
      duration: 3,
      content: '登录超时或错误请重新登录'
    })
    // 清除store信息
    store.commit('REMOVE_TOKEN');
    store.commit('REMOVE_USER_NAME');
    // router.push({ path: '/login' })
  }
  return response.data
}, error => {
  console.log('err' + error) // for debug
//   Message.error({
//     top: 50,
//     duration: 3,
//     content: '操作失败'
//   })
  return Promise.reject(error)
})

export default service

import login from 'api/login'
import { getToken, setToken, removeToken, getUserName } from '@/utils/auth'
// 展示需要的用户信息
const user = {
    state: {
        userName: getUserName(),
        trueName: '',
        token: getToken()
    },
    mutations: {
        SET_USER_NAME: (state, userName) => {
            state.userName = userName
        },
        SET_TRUE_NAME: (state, trueName) => {
            state.trueName = trueName
        },
        SET_PHONE: (state, phone) => {
            state.phone = phone
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        }
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            console.log(userInfo)
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const data = response
                    // console.log(data)
                    // 设置token，保留
                    // commit('SET_USER_NAME', data.userName)
                    // commit('SET_TRUE_NAME', data.trueName)
                    // commit('SET_PHONE', data.phone)
                    resolve(response)
                })
            }).catch(error => {
                reject(error)
            })
        }
    }
}

export default user
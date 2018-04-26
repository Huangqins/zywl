import login from 'api/login'
import { getToken, setToken, removeToken, getUserName, setUserName, removeUserName } from '@/utils/auth'
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
        },
        REMOVE_TOKEN: (state) => {
            state.token = ''
        },
        REMOVE_USER_NAME: (state) => {
            state.userName = ''
        }
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const data = response
                    commit('SET_TOKEN', data.token)
                    setToken(data.token)
                    commit('SET_USER_NAME', data.userName)
                    setUserName(data.userName)
                    commit('SET_TRUE_NAME', data.trueName)
                    resolve(response)
                })
            }).catch(error => {
                reject(error)
            })
        }
    }
}

export default user
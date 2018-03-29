import login from 'api/login'
// 展示需要的用户信息
const user = {
    state: {
        userName: '',
        trueName: '',
        phone: 0
    },
    mutations: {
        SET_USER_NAME: (state, userName) => {
            state.userName = userName
        },
        SET_trueName: (state, trueName) => {
            state.trueName = trueName
        },
        SET_PHONE: (state, phone) => {
            state.phone = phone
        }
    },
    actions: {
        // 登录
        Login({commit}, userInfo) {
            // console.log(userInfo)
            const userName = userInfo.userName.trim()
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const data = response
                    // 设置token，保留
                    // commit('SET_USER_NAME', data.userName)
                    // commit('SET_trueName', data.trueName)
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
import login from 'api/login'
// 展示需要的用户信息
const user = {
    state: {
        username: '',
        true_name: '',
        phone: 0
    },
    mutations: {
        SET_USER_NAME: (state, username) => {
            state.username = username
        },
        SET_TRUE_NAME: (state, true_name) => {
            state.true_name = true_name
        },
        SET_PHONE: (state, phone) => {
            state.phone = phone
        }
    },
    actions: {
        // 登录
        Login({commit}, userInfo) {
            // console.log(userInfo)
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const data = response
                    console.log(data)
                    // 设置token，保留
                    commit('SET_USER_NAME', data.username)
                    commit('SET_TRUE_NAME', data.true_name)
                    commit('SET_PHONE', data.phone)
                    resolve(response)
                })
            }).catch(error => {
                reject(error)
            })
        }
    }
}

export default user
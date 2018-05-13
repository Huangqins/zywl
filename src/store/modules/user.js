import login from 'api/login'
import {
  getToken,
  setToken,
  removeToken,
  getUserName,
  setUserName,
  removeUserName,
  setUsability,
  setUserModel
} from '@/utils/auth'
// 展示需要的用户信息
const user = {
  state: {
    userName: getUserName(),
    trueName: '',
    token: getToken(),
    isTry: '',
    model: ''
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
    },
    SET_USER_TRY: (state, isTry) => {
      state.isTry = isTry
    },
    SET_MODEL: (state, model) => {
      state.model = model
    },
    REMOVE_USER_TRY: (state) => {
      state.isTry = ''
    },
    REMOVE_USER_MODEL: (state) => {
      state.model = ''
    }
  },
  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response
          console.log(data.token)
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          commit('SET_USER_NAME', data.userName)
          setUserName(data.userName)
          commit('SET_TRUE_NAME', data.trueName)
          setUsability(data.isTry)
          commit('SET_USER_TRY', data.isTry)
          setUserModel(data.model)
          commit('SET_MODEL', data.model)
          resolve(response)
        })
      }).catch(error => {
        reject(error)
      })
    }
  }
}

export default user

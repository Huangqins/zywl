import request from '@/utils/request'

function login({ username, password }) {
    return request({
        url: '/user/userRegister',
        method: 'post',
        data: { username, password }
    })
}

export default login
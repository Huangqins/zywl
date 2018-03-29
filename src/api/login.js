import request from '@/utils/request'

function login({ userName, password }) {
    return request({
        url: '/ZY/user/userRegister.do',
        method: 'post',
        data: { userName, password }
    })
}

export default login
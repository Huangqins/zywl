import request from '@/utils/request'

function login({ userName, password }) {
    return request({
        url: '/user/userRegister.do',
        method: 'post',
        data: { userName, password }
    })
}

export default login
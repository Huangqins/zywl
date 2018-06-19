import request from '@/utils/request'

function login({ userName, password, verifyCode }) {
    return request({
        url: '/ZY/user/userLogin',
        method: 'post',
        data: { userName, password, verifyCode }
    })
}

export default login
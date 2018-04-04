import request from '@/utils/request'

function login({ userName, password, verifyCodeID, verifyCode }) {
    return request({
        url: '/ZY/user/userLogin',
        method: 'post',
        data: { userName, password, verifyCodeID, verifyCode }
    })
}

export default login
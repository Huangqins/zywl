import request from '@/utils/request'

function login({ userName, password, VerifyCodeID, VerifyCode }) {
    return request({
        url: '/ZY/user/userLogin',
        method: 'post',
        data: { userName, password, VerifyCodeID: VerifyCodeID.toLowerCase(), VerifyCode: VerifyCode.toLowerCase() }
    })
}

export default login
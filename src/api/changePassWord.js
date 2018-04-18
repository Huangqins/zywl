import request from '@/utils/request'

export default function ChangePassWord({ token, userName, password, oldPassword }) {
    return request({
        method: 'post',
        url: '/ZY/user/updatePassword',
        data: {
            token, userName, password, oldPassword
        }
    })
}
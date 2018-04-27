import request from '@/utils/request'

export default function userTips({ userName }) {
    return request({
        method: 'post',
        url: '/ZY/user/tips',
        data: {
            userName
        }
    })
}
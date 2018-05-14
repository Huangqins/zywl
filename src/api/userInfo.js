import request from '@/utils/request'

export default function userTips() {
    return request({
        method: 'post',
        url: '/ZY/user/userInfo',
        data: {}
    })
}
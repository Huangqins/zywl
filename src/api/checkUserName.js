import request from '@/utils/request'

export default function checkUserName({ userName }) {
    return request({
        method: 'post',
        url: '/ZY/user/checkUserName',
        data: {
            userName
        }
    })
}
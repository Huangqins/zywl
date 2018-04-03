import request from '@/utils/request'

function getIdentifyCode({ phone }) {
    return request({
        url: '/ZY/user/getIdentifyCode',
        method: 'post',
        data: {
             phone
        }
    })
}

export default getIdentifyCode
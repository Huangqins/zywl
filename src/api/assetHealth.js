import request from '@/utils/request'

export default function assetHealth({}) {
    return request({
        method: 'post',
        url: '/ZY/vuln/assetsHealth',
        data: {}
    })
}

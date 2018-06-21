import request from '@/utils/request'

export default function vulnAssetsTotal({}) {
    return request({
        method: 'post',
        url: '/ZY/vuln/vulnAssetsTotal',
        data: {}
    })
}

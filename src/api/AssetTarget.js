import request from '@/utils/request'

export default function assetTarget({username}) {
    return request({
        method: 'post',
        url: '/ZY/task/searchAssetTarget',
        data: {
            username
        }
    })
}
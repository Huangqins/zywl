import request from '@/utils/request'

export default function assetsInfo({targetId, vulnId}) {
    return request({
        method: 'post',
        url: '/ZY/vuln/vulnSearch',
        data: {
            targetId,
            vulnId
        }
    })
}
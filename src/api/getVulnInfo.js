import request from '@/utils/request'

export default function getVulnInfo(obj) {
    return request({
        method: 'post',
        url: '/ZY/vuln/getVulnInfo',
        data: obj
    })
}
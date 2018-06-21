import request from '@/utils/request'

export default function vulnLevelTotal({startTime,endTime}) {
    return request({
        method: 'post',
        url: '/ZY/vuln/vulnLevelTotal',
        data: {startTime,endTime}
    })
}

import request from '@/utils/request'

export default function vulnHighTotal({startTime,endTime}) {
    return request({
        method: 'post',
        url: '/ZY/vuln/vulnHighTotal',
        data: {startTime,endTime}
    })
}

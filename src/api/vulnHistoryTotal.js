import request from '@/utils/request'

export default function vulnAssetsTotal({startTime,endTime}) {
    return request({
        method: 'post',
        url: '/ZY/vuln/vulnHistoryTotal',
        data: {startTime,endTime}
    })
}

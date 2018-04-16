import request from '@/utils/request'

export default function assetsSet({ taskName, strategy, cycle, userName, startTime, assetsUrl, assetsIp }) {
    return request({
        method: 'post',
        url: '/ZY/task/addTask',
        data: {
            taskName, strategy, cycle, userName, startTime, assetsUrl, assetsIp
        }
    })
}

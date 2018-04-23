import request from '@/utils/request'

export default function assetsSet({ target_name, target_teststra, target_cycle, userName, target_starttime, target_url, target_ip }) {
    return request({
        method: 'post',
        url: '/ZY/task/addTask',
        data: {
            target_name, target_teststra, target_cycle, userName, target_starttime, target_url, target_ip
        }
    })
}

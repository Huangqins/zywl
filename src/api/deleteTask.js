import request from '@/utils/request'

export default function deleteTask({ target_id }) {
    return request({
        method: 'post',
        url: '/ZY/task/deleteTask',
        data: {
            target_id
        }
    })
}
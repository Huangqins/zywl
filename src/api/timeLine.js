import request from '@/utils/request'

export default function timeLine({target_id, flag}) {
    return request({
        method: 'post',
        url:'/ZY/task/timeLine',
        data: {
             target_id,
             flag
         }
    })
}

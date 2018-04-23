import request from '@/utils/request'

export default function vulnLevel({taskID}) {
    return request({
        method: 'post',
        url:'/ZY/task/vulnTotal',
        data: {
            taskID
         }
    })
}
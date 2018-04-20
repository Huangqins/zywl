import request from '@/utils/request'

export default function lineChart({taskID, currentTime}) {
    return request({
        method: 'post',
        url:'/ZY/task/timeLine',
        data: {
            taskID, 
            currentTime
         }
    })
}
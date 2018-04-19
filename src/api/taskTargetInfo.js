import request from '@/utils/request'

export default function taskTargetInfo({userName, targetStruts}) {
    return request({
        method: 'post',
        url:'/ZY/task/targetInfo',
        data: {
             userName, 
             targetStruts
         }
    })
}
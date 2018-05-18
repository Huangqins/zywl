import  request from '@/utils/request';
export default function getSystemInfo() {
    return request({
        method: 'post',
        url: '/ZY/system/getSystemInfo',
        data: {        }
    })
}
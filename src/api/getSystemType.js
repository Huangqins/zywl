import request from '@/utils/request';

export default function getSystemType(obj) {
    return request({
        method: 'post',
        url: '/ZY/asset/getSystemType',
        data: obj
    })
}
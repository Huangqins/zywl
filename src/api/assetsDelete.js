import request from '@/utils/request'

export default function assetsDelete({assetsId}) {
    return request({
        method: 'post',
        url: '/ZY/asset/assetsDelete',
        data: {
            assetsId
        }
    })
}
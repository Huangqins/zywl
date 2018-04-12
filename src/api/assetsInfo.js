import request from '@/utils/request'

export default function assetsInfo({ area }) {
    return request({
        method: 'post',
        url: '/ZY/asset/assetsInfo',
        data: {
            area
        }
    })
}

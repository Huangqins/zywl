import request from '@/utils/request'

export default function assetsInfo({ area, rows, page, userName }) {
    return request({
        method: 'post',
        url: '/ZY/asset/assetsInfo',
        data: {
            userName,
            area,
            rows,
            page
        }
    })
}

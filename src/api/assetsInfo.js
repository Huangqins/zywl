import request from '@/utils/request'

export default function assetsInfo({ area, rows, page }) {
    return request({
        method: 'post',
        url: '/ZY/asset/assetsInfo',
        data: {
            area,
            rows,
            page
        }
    })
}

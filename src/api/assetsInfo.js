import request from '@/utils/request'

export default function assetsInfo({ assets_zone = 0, rows, page }) {
    return request({
        method: 'post',
        url: '/ZY/asset/assetsInfo',
        data: {
            assets_zone,
            rows,
            page
        }
    })
}

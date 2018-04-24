import request from '@/utils/request'

export default function assetsDelete({assets_id}) {
    return request({
        method: 'post',
        url: '/ZY/asset/assetsDelete',
        data: {
            assets_id
        }
    })
}
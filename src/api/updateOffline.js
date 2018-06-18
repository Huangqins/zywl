import request from '@/utils/request'

export default function updateOffline({ version }) {
    return request({
        method: 'post',
        url: '/ZY/system/updateVersion',
        data: { version }
    })
}
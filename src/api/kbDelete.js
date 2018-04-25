import request from '@/utils/request'

export default function kbDelete({ kb_vuln_id }) {
    return request({
        method: 'post',
        url: '/ZY/kb/deleteKB',
        data: {
            kb_vuln_id
        }
    })
}
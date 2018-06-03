import  request from '@/utils/request';
export default function vulnUseInfo({target_id}) {
    return request({
        method: 'post',
        url: '/ZY/vuln/getVulnUseInfo',
        data: {
            target_id
        }
    })
}
import  request from '@/utils/request';
export default function vulnvulncount({flag}) {
    return request({
        method: 'post',
        url: '/ZY/kb/kbCharts',
        data: {
            flag
        }
    })
}
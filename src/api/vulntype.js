import  request from '@/utils/request';
export default function vulnType({flag}) {
    return request({
        method: 'post',
        url: '/ZY/kb/kbCharts',
        data: {
            flag
        }
    })
}
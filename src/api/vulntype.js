import  request from '@/utils/request';
export default function vulnTop({}) {
    return request({
        method: 'post',
        url: '/ZY/asset/vulnTopTen',
        data: {
            
        }
    })
}
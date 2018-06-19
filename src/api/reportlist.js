import request from '@/utils/request'

function reportList({ userName }) {
    return request({
        url: '/ZY/report/reportList',
        method: 'post',
        data: {
            userName
        }
    })
}

export default reportList
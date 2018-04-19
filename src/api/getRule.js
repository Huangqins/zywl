import request from '@/utils/request';

export default function getRule({ flag }) {
    return request({
        method: 'post',
        url: '/ZY/task/getRule',
        data: {
            flag
        }
    })
}
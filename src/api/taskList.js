import request from '@/utils/request';
export default function taskList({ area, rows, page,userName }) {
    return request({
        method: 'post',
        url: '/ZY/task/targetInfo',
        data: {
            area,
            rows,
            page,
            userName
        }
    })
}
import request from '@/utils/request'

export default function getTargetLog({ target_id}) {
  return request({
    url: '/ZY/task/getTargetLog',
    method: 'post',
    data: {
        target_id
    }
  })
}
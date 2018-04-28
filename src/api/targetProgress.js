import request from '@/utils/request'

export default function targetProgress({ target_id }) {
  return request({
    method: 'post',
    url:'/ZY/task/targetProgress',
    data: {
      target_id
    }
  })}

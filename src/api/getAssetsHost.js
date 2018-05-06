import request from '@/utils/request'

export default function getAssetsHost({
  target_id
}) {
  return request({
    method: 'post',
    url: '/ZY/task/getAssetsHost',
    data: {
      target_id
    }
  })
}

import request from '@/utils/request'

export default function vulnWordClouds({
  target_id
}) {
  return request({
    method: 'post',
    url: '/ZY/vuln/vulnWordClouds',
    data: {
      target_id
    }
  })
}

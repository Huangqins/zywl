import request from '@/utils/request'

export default function vulnWordClouds(obj) {
  return request({
    method: 'post',
    url: '/ZY/vuln/vulnWordClouds',
    data: obj
  })
}

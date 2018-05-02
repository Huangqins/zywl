import request from '@/utils/request'

export default function vulnTotal({ target_id}) {
  return request({
    method: 'post',
    url: '/ZY/vuln/vulnTotal',
    data: { target_id }
  })
}

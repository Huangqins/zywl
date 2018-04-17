import request from '@/utils/request'

export default function leaksInfo({
  token,
  rows,
  page
}) {
  return request({
    url: '/ZY/vuln/vulnSearch',
    method: 'post',
    data: {
      token,
      rows,
      page
    }
  })
}

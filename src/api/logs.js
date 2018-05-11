import request from '@/utils/request'

export default function logs({
  rows,
  page
}) {
  return request({
    url: '/ZY/log/loginLogSearch',
    method: 'post',
    data: {
      rows,
      page
    }
  })
}
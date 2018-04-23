import request from '@/utils/request'

export default function KBInfo({
  userName,
  rows,
  page,
}) {
  return request({
    url: '/ZY/kb/KBInfo',
    method: 'post',
    data: {
      userName,
      rows,
      page,
    }
  })
}
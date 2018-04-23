import request from '@/utils/request'

export default function leaksInfo({
  userName,
  rows,
  page,
  taskId,
  targetId
}) {
  return request({
    url: '/ZY/vuln/vulnSearch',
    method: 'post',
    data: {
      userName,
      rows,
      page,
      taskId,
      targetId
    }
  })
}

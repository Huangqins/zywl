import request from '@/utils/request'

export default function exportPDF({
  target_name,
  target_id
}) {
  return request({
    method: 'post',
    url: '/ZY/report/exportPDF',
    data: {
      target_name,
      target_id
    }
  })
}

import request from '@/utils/request'

export default function cvndNum({ }) {
  return request({
    url: '/ZY/kb/cvndNum',
    method: 'post',
    data: {    }
  })
}
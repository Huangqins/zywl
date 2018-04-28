import request from '@/utils/request'

export  default  function urlUseRate({ target_id }) {
  return request({
    method: 'post',
    url: '/ZY/task/urlUseRate',
    data: {
      target_id
    }
  })
}

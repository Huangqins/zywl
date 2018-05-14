import request from '@/utils/request'

export  default  function updateUser(obj) {
  return request({
    method: 'post',
    url: '/ZY/user/updateUser',
    data: obj
  })
}

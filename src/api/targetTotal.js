import request from '@/utils/request'

export default function targetTotal({}){
  return request({
    method:'post',
    url:'/ZY/task/targetTotal',
    data:{}
  })
}
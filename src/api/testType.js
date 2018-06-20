import request from '@/utils/request'

export default function testType({}){
  return request({
    method:'post',
    url:'/ZY/task/targetTypeTotal',
    data:{}
  })
}
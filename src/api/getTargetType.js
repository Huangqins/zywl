import request from '@/utils/request'

export default function getTargetType({}){
  return request({
    method:'post',
    url:'/ZY/task/getTargetType',
    data:{}
  })
}
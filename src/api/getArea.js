import request from '@/utils/request'

export default function getArea({}){
  return request({
    method:'post',
    url:'/ZY/asset/getArea',
    data:{}
  })
}
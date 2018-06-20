import request from '@/utils/request'

export default function repairRate({}){
  return request({
    method:'post',
    url:'/ZY/vuln/repairRate',
    data:{}
  })
}
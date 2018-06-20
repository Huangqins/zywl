import request from '@/utils/request'

export default function postSum({}){
  return request({
    method:'post',
    url:'/ZY/asset/getAssetsPort',
    data:{}
  })
}
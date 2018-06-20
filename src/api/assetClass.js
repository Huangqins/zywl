
import request from '@/utils/request'

export default function assetclass({flag}){
  return request({
    method:'post',
    url:'/ZY/asset/getAssetsClass',
    data:{
         flag
    }
  })
}

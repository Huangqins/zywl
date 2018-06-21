import request from '@/utils/request'

export default function getServiceList({ assets_id }) {
  return request({
    method: 'post',
    url:'/ZY/asset/getServiceList',
    data: {
      assets_id
    }
  })}

import request from '@/utils/request'

export default function getAssetURL({ username }) {
  return request({
    method: 'post',
    url:'/ZY/asset/getAssetURL',
    data: {
      username
    }
  })}

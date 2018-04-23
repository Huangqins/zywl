import request from '@/utils/request'

export default function assetAdd({
  Assets_name,
  Assets_url,
  Assets_ip,
  Assets_network_ports,
  Assets_network_type,
  Assets_type,
  Assets_important,
  Assets_os_type,
  Assets_manger,
  Assets_creatuser,
  Assets_desc,
  Assets_detail,
  Assets_hostname,
  Assets_numbering
}) {
  return request({
    method: 'post',
    url: '/ZY/asset/addAssets',
    data: {
      Assets_name,
      Assets_url,
      Assets_ip,
      Assets_network_ports,
      Assets_network_type,
      Assets_type,
      Assets_important,
      Assets_os_type,
      Assets_manger,
      Assets_creatuser,
      Assets_desc,
      Assets_detail,
      Assets_hostname,
      Assets_numbering
    }
  })
}

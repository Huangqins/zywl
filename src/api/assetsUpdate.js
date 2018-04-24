import request from '@/utils/request'

export default function assetsUpdate({
  assets_id,
  assets_name,
  assets_url,
  assets_ip,
  assets_network_ports,
  assets_network_type,
  assets_type,
  assets_important,
  assets_os_type,
  assets_manger,
  assets_creatuser,
  assets_desc,
  assets_detail,
  assets_hostname,
  assets_numbering
}) {
  return request({
    method: 'post',
    url: '/ZY/asset/updateAssets',
    data: {
      assets_id,
      assets_name,
      assets_url,
      assets_ip,
      assets_network_ports,
      assets_network_type,
      assets_type,
      assets_important,
      assets_os_type,
      assets_manger,
      assets_creatuser,
      assets_desc,
      assets_detail,
      assets_hostname,
      assets_numbering
    }
  })
}

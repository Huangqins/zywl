import request from '@/utils/request'

export default function repairVuln({vuln_id, vuln_status}){
  return request({
    method:'post',
    url:'/ZY/vuln/repairVuln',
    data:{
      vuln_id,
      vuln_status

    }
  })
}
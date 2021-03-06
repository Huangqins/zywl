import request from '@/utils/request';
export default function KBUpdate({
    kb_vuln_id,
    kb_vuln_name,
    kb_vuln_cve,
    kb_vuln_vnum,
    kb_vuln_level,
    kb_vuln_port,
    kb_vuln_type,
}){
 return request({
    method:"post",
    url:"ZY/kb/updateKB",
    data:{
    kb_vuln_id,
    kb_vuln_name,
    kb_vuln_cve,
    kb_vuln_vnum,
    kb_vuln_level,
    kb_vuln_port,
    kb_vuln_type,
    }
 })
}
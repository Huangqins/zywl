import request from '@/utils/request'

function reportPdf({ target_name, target_id, depart_name }) {
    return request({
        url: '/ZY/report/exportPDFFile',
        method: 'post',
        data: { target_name, target_id, depart_name }
    })
}

export default reportPdf
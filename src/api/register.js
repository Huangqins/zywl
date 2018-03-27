import request from '@/utils/request'

function register({username, password, confirm_password, email, phone, trueName, IDCard, company}) {
    return request({
        url: '/user/userRegister',
        method: 'post',
        data: {
            username, password, confirm_password, email, phone, trueName, IDCard, company
        }
    })
}

export default register
import request from '@/utils/request'

function register({userName, password, email, phone, trueName, IDCard, company}) {
    return request({
        url: '/ZY/user/userRegister.do',
        method: 'post',
        data: {
            userName, password, email, phone, trueName, IDCard, company
        }
    })
}

export default register
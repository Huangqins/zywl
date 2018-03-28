import request from '@/utils/request'

function login({ username, password }) {
    return request({
        url: 'user/userRegister',
        methods: 'post',
        data: { username, password }
    })
}

export default login
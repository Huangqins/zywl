// 接口工厂方法
/*
projectPath: 项目路径
*/

import request from '@/utils/request'
// const fs = require('fs');
// console.log(fs)
// const apiJSON = require('./api.json')
const apiFile = {
    "userLogin": {
      "method": "post",
      "url": "user/userLogin",
      "data": {}
    }
  }
  
const baseConfig = {
  projectPath: '/ZY/'
}

let api = {}

for (let i in apiFile) {
        api[i] = apiFile[i]
        api[i].url = `${baseConfig.projectPath}`+ apiFile[i].url
}
console.log(api)

let exportApi = {}

function createApi() {
  const allPath = Object.keys(api)
  for (let key of allPath) {
    let params = api[key]
    exportApi[key] =  () => {
        return request(params)
    }
  } 
}
createApi()

export default {}

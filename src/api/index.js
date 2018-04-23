// 接口工厂方法
/*
projectPath: 项目路径
*/

import request from '@/utils/request'
const fs = require('fs')
const apiJSON = require('./api.json')
const apiFile = JSON.parse(fs.readFileSync(apiJSON))


const baseConfig = {
  projectPath: '/ZY/'
}

let api = {}

for (let i in apiFile) {
    if (i === "url") {
        api[url] = `${baseConfig}apiFile[i]`
    } else {
        api[i] = apiFile[i]
    }
}

export default function createApi() {
  const allPath = api.keys()
  const exportApi = {}
  for (let key of allPath) {
    let params = api[key]
    exportApi[key] = {
      request(params)
    }
  }
  return 
}

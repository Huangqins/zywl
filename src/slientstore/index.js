// 存储 用户查询信息
//  任务id

let localstorage = window.localStorage;

export function addTaskId(value) {
    localstorage.setItem('taskId',value)
}

export function replaceTaskId(value) {
    
}
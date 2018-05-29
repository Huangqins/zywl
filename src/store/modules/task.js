
const task = {
    state: {
        taskInfo: {},
        taskId: 0
    },
    mutations: {
        SAVE_TASK: (state,taskInfo) => {
            state.taskInfo = taskInfo
        },
        SAVE_TASK_ID: (state, taskId) => {
            state.taskId = taskId
        }
    }
}

export default task
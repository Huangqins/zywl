const getters = {
    userName: state => state.user.userName,
    trueName: state => state.user.trueName,
    token: state => state.user.token,
    isTry: state => state.user.isTry,
    model: state => state.user.model,
    visitedViews: state => state.tagsView.visitedViews,
}

export default getters
const tagsView = {
    state: {
        visitedViews: []
    },
    mutations: {
        ADD_VISITED_VIEWS: (state, view) => {
            if (state.visitedViews.some(v => v.path === view.path)) return //已存在不加入
            	state.visitedViews.push({
            		name: view.name,
            		path: view.path,
            		title: view.meta.title || 'no-name'
				})
        },
        DEL_VISITED_VIEWS: (state, view) => {
        	for ( const [i, v] of state.visitedViews.entries()) {
        		if (v.path === view.path) {
        			 state.visitedViews.splice(i, 1)
          			 break
        		}
        	}
		},
		DEL_VISITED_ALL: (state, view) => {
			state.visitedViews = view
		}
    },
    actions: {
    	addVisitedViews({ commit }, view) {
    		commit('ADD_VISITED_VIEWS', view)
    	},
    	delVisitedViews({ commit, state }, view) {
    		return new Promise((resolve) => {
    			 commit('DEL_VISITED_VIEWS', view)
    			 resolve([...state.visitedViews])
    		})
		},
		delVisitedAll({ commit } ,view) {
			commit('DEL_VISITED_ALL', view)
		}
    }
}

export default tagsView






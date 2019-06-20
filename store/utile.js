// promptMessage和waiting动画的状态

const state = function(){
    return {
        promptMessage: null,
        showWaiting: false
    }
}
const mutations = {
    // 设置模块的状态信息
    setPromptMessage(state, msg){        
        if(state.promptMessage != msg)
            state.promptMessage= msg
    },
    setShowWaiting(state, condition){
        
        if(state.showWaiting != condition)
            state.showWaiting = condition
    }
}

export {
    state,
    mutations
}
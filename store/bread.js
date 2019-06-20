//网站面包屑信息的状态

const state = function(){
    return {
        module: undefined,
        part: undefined
    }
}
const mutations = {
    // 设置模块的状态信息
    setModule(state, module){
        if( !module || module === state.module ) return
        
        state.module= module
    },
    setPart(state, part){
        if( !part || part === state.part ) return
        
        state.part = part
    }
}

export {
    state,
    mutations
}
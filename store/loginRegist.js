const state = function(){
    return{
        wichBox: 'loginBox',        // 选择登录还是注册
        isShow: false,            // 默认隐藏登录/注册界面
        showUserCenterList: false    //用户操作列表显隐
    }
}

const mutations = {
    setWichBox(state, box){
        if(!state.isShow){
            state.isShow = true;
        }
        if(state.wichBox != box)
            state.wichBox = box
    },
    setIsShow(state, condition){
        if(state.isShow != condition)
            state.isShow = condition
    },
    setShowUserCenterList(state, condition){
        if(state.showUserCenterList != condition)
            state.showUserCenterList = condition
    }
}

export{
    state,
    mutations
}
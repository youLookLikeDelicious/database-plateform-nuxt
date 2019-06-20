import axios from '@/plugins/axios'

const state = function(){
    return{
        id: undefined,          // 用户id
        stamp: undefined,       // 用户头像
        nickname: undefined,    // 用户名
        message_num: undefined, // 未读消息数量
        navBtn: 'logRegistBtn', // 默认显示登录/注册按钮
        geted: false,           // 是否已经请求过
        //navBtn: 'userInfoBtn',  // 默认显示登录/注册按钮
    }
}
const mutations = {
    //
    setNavBtn(state, btn){
        if(state.navBtn === btn) return
        state.navBtn = btn
    },
    // 设置用户的状态信息
    setUserInfo(state, userInfo){
        if(userInfo == null) return
        
        for(let key in state){
            state[key] = userInfo[key]
        }
    },
    // 清除用户有关的信息
    clearUserInfo(state){
        for(let k in state){
            if(k !== 'navBtn')
                state[k] = undefined
        }
    },
    setGeted(state, condition){
        state.geted = condition
    }
}
const actions = {
    // 判断用户是否自动登录
    getUserInfo({state, commit}){
        if( state.geted ) return
        axios({
            method: 'GET',
            url: '/checkAutoLogin'
        }).then(response => {
            if(response.data){
                commit('setUserInfo', response.data)
                commit('setNavBtn', 'userInfoBtn')
            } else{
                commit('setNavBtn', 'logRegistBtn')
            }
        }).catch( ()=> {
            commit('setNavBtn', 'logRegistBtn')
        }).finally( ()=>{
            commit('setGeted', true)
        })
    },
    logout({commit, state}){
        // 登出系统
        axios({
            method: 'GET',
            url: 'logout'
        }).then(response => {
            // 清空用户状态，切换到未登录状态
            commit('setNavBtn', 'logRegistBtn')
            commit('clearUserInfo')
        }).catch( e=>{
            console.log(e)
        } )
    }
}
export {
    state,
    mutations,
    actions
}
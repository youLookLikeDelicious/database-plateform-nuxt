<template>
<div v-show="isShow"
     @mouseover="setListVisible(true)"
     @mouseout="setListVisible(false)"
     class="user_center_list">
    <ul>
        <li>
            <a href="/user-center.html">
            <i @click="toUserCenter" class="icofont-user-male"></i>
             个人主页</a></li>             
        <li>
            <a>
            <i class="icofont-alarm"></i>
             未读消息</a></li>            
        <li>
            <a><i class="icofont-star"></i>
             我的收藏</a></li>
        <li>
            <a><i class="icofont-settings"></i>
             设置</a></li>
        <li>
            <a @click="logOut"><i class="icofont-logout"></i>
             退出登录</a></li>
    </ul>
</div>
</template>

<script>
export default{
    name: 'userCenterList',
    data(){
        return {
            height: null    // 组件的高度
        }
    },
    computed: {
      // 当前组件显隐属性
      isShow(){
          return this.$store.state
                  .loginRegist.showUserCenterList
        }
    },
    methods:{
        setListVisible(condition){
            this.$store.commit('loginRegist/setShowUserCenterList', condition)
        },
        /*
         * 登出操作
         * 显示导航栏的登录/注册按钮
         * 隐藏个人中心列表
         */
        logOut(){
            this.$store.dispatch('userInfo/logout')
            this.$store.commit('loginRegist/setShowUserCenterList', false)
        },
        toUserCenter(){
          if(process.env.VUE_ENV != 'server'){
            //window.location.href = '/user-center.html'
          }
        }
    },
    mounted(){
        // 计算组件的高度
        this.height = this.$el.style.height;
    }
}
</script>

<style lang="scss">

.user_center_list{
    @extend %side_nav;
    right: 0;
    top: 0.55rem;
    width: 1.7rem;
    background-color: #292929;
    padding-top: 0.05rem;
    transition-duration: 0.3s;
    z-index: 10;
    a{
        transition-duration: 0.2s;
        &:link, &:visited{
            color: #FFFFFF
        }
    }
    ul li{
        margin-top: 0.13rem;
    }
    ul{
        margin-bottom: 0.19rem;
    }
}
</style>
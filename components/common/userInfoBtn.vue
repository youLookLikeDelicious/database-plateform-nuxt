<template>
    <div 
        @mouseover="setListVisible(true)"
        @mouseout="setListVisible(false)"
        class="personal_center">
        <img class="user_stamp" :src="$baseUrl + stamp" alt="头像">
        <span class="user_name">{{name}} ▼</span>
    </div>
</template>

<script>
    export default {
        name: 'userInfoBtn',
        methods:{
            // 设置个人中心操作列表的显隐
            setListVisible(condition){
                this.$store.commit('loginRegist/setShowUserCenterList', condition)
            }
        },
        computed:{
            stamp(){
                return this.$store.state.userInfo.stamp
            },
            name(){
                return this.$store.state.userInfo.nickname
            }
        }
    }
</script>

<style lang="scss">
    .personal_center{
        margin-right: 0.25rem;
        .user_stamp{
            width: 0.37rem;
            height: 0.37rem;
            border-radius: 0.37rem;
            vertical-align:middle;
            cursor: pointer;
        }
        .user_name{
            font-size: 0.14rem;
            margin-left: $little-space;
            margin-right: $little-space;
            cursor: pointer;
        }
    }
</style>
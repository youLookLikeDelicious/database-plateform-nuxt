<template>
<div class="personal_center">
    <div @click="showLoginRegist('loginBox')" class="login">登录</div>
    <div @click="showLoginRegist('registBox')" class="regist">注册</div>
</div>
</template>

<script>
export default {
    name: 'logRegistBtn',
    methods: {
        showLoginRegist(box){
            this.$store.commit('loginRegist/setWichBox', box)
        }
    }
}
</script>
<style lang="scss">

</style>
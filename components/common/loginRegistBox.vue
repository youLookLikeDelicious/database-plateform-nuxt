<template>
    <div v-show="isShow"
        :style="{
            'backgroundColor': backgroundColor
        }"
        class="login-regist-box">
        <form>
            <div class="wrap">
                <div
                    v-if="allowClose"
                    class="close-wrap">
                    <a class="close-btn icofont-ui-close" @click="hidBox" title="关闭"></a>
                </div>
                <header class="mult_tags mult_tags_red">
                    <ul>
                        <li 
                            @click="setBox('loginBox')" 
                            :class="{on: wichBox === 'loginBox'}"><span>登录</span>
                        </li>
                        <li 
                            @click="setBox('registBox')" 
                            :class="{on: wichBox !== 'loginBox'}"><span>注册</span>
                        </li>
                    </ul>
                </header>
                <component 
                @logSuccess="logSuccess"
                :is="wichBox"></component>
            </div>
        </form>
        <waiting v-if="$store.state.utile.showWaiting"/>
        <message />
    </div>
</template>

<script>
import loginBox from '@/components/common/login'
import registBox from '@/components/common/regist'
import waiting from './waiting'
export default {
    name: 'loginRegistBox',
    props:{
        backgroundColor: {
            default: 'RGBA(33,33,33,0.6)'
        },
        allowClose: {
            default: true
        }
    },
    data(){
        return {
            mulTagConfig: {
                list: ['登 录', '注 册'],
                tagStyle: 'red'
            },
            promptMessage: undefined    // 提示信息
        }
    },
    methods: {
        /*
         * 显示或隐藏等待动画
         * 1显示
         * 0隐藏
         */     
        setBox(box){
            this.$store.commit('loginRegist/setWichBox', box)
        },
        // 关闭登录注册窗口
        hidBox(){
            this.$store.commit('loginRegist/setIsShow', false)
        },
        logSuccess (user){
            this.$store.commit('loginRegist/setIsShow', false)
            this.$store.commit('userInfo/setUserInfo', user)
            this.$store.commit('userInfo/setNavBtn', 'userInfoBtn')
        }
    },
    computed:{
        isShow(){
            return this.$store.state.loginRegist.isShow
        },
        wichBox(){
            return this.$store.state.loginRegist.wichBox
        }
    },
    components: {
        'loginBox':  loginBox,
        'registBox': registBox,
        'waiting':   waiting,
    }
}
</script>

<style lang="scss">
.login-regist-box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    font-size: 0.16rem;
    z-index: 99;
    .wrap{
        width: 3.5rem;
        border-radius: 0.07rem;
        background-color: #FFFFFF;
        margin: 0.9rem auto;
        position: relative;
        padding-top: $mid-space;
        box-shadow: 0.02rem 0.02rem 0.05rem #e9ebee;
        
/*        禁用登录/注册按钮样式*/
        .unenable{
            opacity: 0.6;
            cursor: default;
            &:hover{
                box-shadow: 0 0 0 #fff;
            }
        }
    }
    .close-wrap{
        overflow: hidden;
    }
    .close-btn{
        height: 0.25rem;
        width: 0.25rem;
        display: block;
        color: $light-gray;
        text-align: right;
        padding-right: 0.09rem;
        float: right;
    }
    // input上的iconfont
    .icofont-user-alt-5, .icofont-lock, .icofont-email{
        position: absolute;
        left: 0.6rem; 
        top: 0.09rem;
        color: $light-gray;
    }
    input, img{
        width: 2.4rem;
        height: 0.35rem;
        margin: $little-space auto 0 auto;
        display: block;
        text-indent: 1.7em;
    }
    img{
        border-radius: 0.03rem;
        cursor: pointer;
    }
    ul li{
        position: relative;
        .error{
            width: 1rem;
            font-size: 0.12rem;
/*            color: #FF9900;*/
            color: #FFF;
            position: absolute;
            top: 0.08rem;
            left: 3rem;
            border-radius: 0.03rem;
            padding: 0.03rem 0.04rem;
            background-color: orange;
            word-break: break-all;
            word-wrap: break-word;
        }
    }
    .mult_tags{
        margin-top: $little-space;
        margin-bottom: $little-space;
        text-align: center;
        font-size: 0.2rem;
        letter-spacing: 0.05rem;
        margin-bottom: 0.24rem;
        display: block;
        ul li{
            span {
                height: 0.25rem;
                line-height: 0.25rem;
                padding-left: 0.1rem;
                padding-right: 0.07rem;
                text-align: center;
            }
            display: inline-block;
            cursor: pointer;
            &::after{
                content: '';
                width: 0%;
                height: 0.02rem;
                margin: 0 auto;
                display: block;
                transition-duration: 0.2s;
            }
            &:hover::after{
                width: 100%;
            }
        }
}
.mult_tags_red{
    // 当前选中项
    .on{
        color: $red-color;
        &::after{
            width: 100%;
        }
    }
    ul li{
        color: $red-color;
        &::after{
            background: $red-color;
        }
    }
} 
}
</style>
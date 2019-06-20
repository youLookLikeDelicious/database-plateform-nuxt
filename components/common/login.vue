<template>
    <form>
        <ul class="login-box">
            <li>
                <i class="icofont-user-alt-5"></i>
                <input 
                @input="checkName($event)"
                name="email" placeholder="邮箱地址" type="text">
                <span 
                        :style="{display: warning.style}" class="error">
                        <i class="icofont-warning"> </i>
                        {{warning.info}}
                </span>
            </li>
            <li>
                <i class="icofont-lock"></i>
                <input name="password" 
                @input="checkPwd($event)" placeholder="密码" type="password">
            </li>
            <li class="login_detail">
                <label>
                    <input type="checkbox" value="1" name="remember">&nbsp;自动登录</label>
            </li>
            <li>
                <a @click="login" 
                :class="{ unenable: denyLogin, 
                        'login-btn': true
                    }">登录</a>
            </li>
            <li class="more-sign">社交帐号</li>
            <li class="weblink">
                <i class="icofont-qq"></i>
            </li>
        </ul>
    </form>
</template>

<script>    
export default {
    name: 'loginBox',
    data(){
        return {
            maxValue: 3,
            flag: 0,
            allowed: true,
            warning: {
                info: '用户名或密码错误',
                style: 'none'
            },
        }
    },
    props: {
        urlParam: {
            default: ''
        }
    },
    computed:{
        denyLogin(){
            return this.flag != this.maxValue || !this.allowed;
        }
    },
    methods:{
        // 
        codeOperat(code, condition){
            // 追加
            if( condition ){
                if((this.flag & code) == 0){
                    this.flag += code;
                }
            } else{
                // 分离
                if((this.flag & code) === code){
                    this.flag -= code;
                }
            }  
        },
        // 检查用户名
        checkName(e){
            var el = e.target;
            this.codeOperat(1, el.value != '');
        },
        // 检查密码
        checkPwd(e){
            var el = e .target;
            this.codeOperat(2, el.value != '');
        },
        // 登录
        login(){
            if(this.denyLogin) return;
            // 显示等待动画
            this.$store.commit('utile/setShowWaiting', true)
            var loginForm = new FormData(this.$el);
            
            this.$axios({
                    url: '/login/true' + this.urlParam,
                    data: loginForm,
                    method: 'POST'
                })
                 .then(response => {
                    var data = response.data;
                    
                    //隐藏等待动画
                    this.$emit('setWaitingAnim', false)
                    // 登录成功
                    if(data.hasOwnProperty('state') && data.state === 'success'){
                        this.$emit('logSuccess', data.user)
                    } else{
                        // 登录失败
                        this.logFail(response.headers)
                    }
                 }).finally( ()=>{
                this.$store.commit('utile/setShowWaiting', false)
            })
        },
        /* 登录失败,提示剩余登录次数
         * 如果剩余的次数耗尽，开始倒计时
         * @param header response.header
         */
        logFail(headers){
            var time = headers['x-ratelimit-remaining'],    // 剩余次数
                warning = this.warning,
                seconds = parseInt(headers['retry-after']);
            // 如果请求次数超过限制，启动定时器
            if( time == 0 && !isNaN(seconds) ){
                // 获取剩余的秒
                var _this = this;

                this.allowed = false;

                // 显示提示信息
                if(warning.style == 'block'){
                    warning.style = 'block';
                }

                warning.info = seconds + 's后重试'

                window.setTimeout(function(){
                    _this.allowed = true;
                    clearInterval(timer);
                    warning.style = 'none';
                }, 1000 * seconds);

                var timer = window.setInterval(function(){
                    warning.info = --seconds + 's后重试';
                }, 1000);

                return;
            }

            warning.info = `剩余尝试次数:${time}`;
            if(warning.style === 'none'){
                warning.style = 'block';
            }
        }
    }
}
</script>

<style lang="scss">
.login-box{
    margin-left: auto;
    margin-right: auto;
    border: 0;
    width: 3.5rem;
    z-index: 100;
    tr td{
        position: relative;
    }
    .login_detail{
        height: 0.35rem;
        line-height: 0.35rem;
        margin-top: $little-space;
        font-size: 0.12rem;
        input{
            width: 0.17rem;
            height: 0.17rem;
            float: left;
            margin-left: 0.55rem;
            margin-top: 0.09rem;
        }
    }
    .login-btn{
        display: block;
        @extend %button-filled-red;
        width: 2.4rem;
        height: 0.35rem;
        line-height: 0.35rem;
        margin: 0.12rem auto 0.24rem auto;
    }
    .more-sign{
        &::before{
            content: '';
            width: 0.6rem;
            height: 0.01rem;
            border-top: 1px solid $light-gray;
            display: inline-block;
            vertical-align: middle;
            margin-right: $little-space;
        }
        &::after{
            content: '';
            width: 0.6rem;
            height: 0.01rem;
            border-top: 1px solid $light-gray;
            display: inline-block;
            vertical-align: middle;
            margin-left: $little-space;
        }
        font-size: 0.14rem;
        color: $light-gray;
        text-align: center;
    }
    .weblink{
        text-align: center;
        font-size: 0.25rem;
        color: $dark-gray;
        padding-bottom: $little-space;
        padding-top: 0.07rem;
    }
}
</style>
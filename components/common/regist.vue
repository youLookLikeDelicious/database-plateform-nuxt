<template>
	<div class="regist-box">
        <form method="post">
            <ul>
                <li>
                    <i class="icofont-user-alt-5"></i>
                    <input 
                        @keyup="checkName($event, 1)" type="text" name="nickname" required="required" placeholder="用户名">
                    <span 
                        :style="{display: warnings.name.style}" class="error">
                        <i class="icofont-warning"> </i>
                        {{warnings.name.info}}</span>
                </li>
                <li>
                    <i class="icofont-lock"></i>
                    <input type="password" 
                        v-model="pwd"
                        @keyup="checkPwd($event, 2)"  name="passwd" 
                        required="required" placeholder="密码">
                    <span 
                        :style="{display: warnings.passwd.style}"
                        class="error">
                        <i class="icofont-warning"> </i>
                        {{warnings.passwd.info}}</span>
                </li>
                <li>
                    <i class="icofont-lock"></i>
                    <input type="password" 
                        v-model="confirmPwd"
                        @keyup="confirmPassword($event, 8)"  name="confirmPwd" 
                        required="required" placeholder="确认密码">
                </li>
                <li>
                    <i class="icofont-email"></i>
                    <input type="text"
                        @input="inputEmail($event)"
                        name="email" 
                        required="required" placeholder="邮箱">
                    <span 
                        :style="{display: warnings.email.style}" class="error">
                        <i class="icofont-warning"> </i>
                        {{warnings.email.info}}
                    </span>
                </li>
                <li>
                    <a @click="regist" 
                    :class="{ unenable: flag != 15, 
                    'regist-btn': true
                }">注册</a></li>
            </ul>
	    </form>
<!--	    验证成功提示信息-->
	    <div class="success-info">
	        <img src="/img/logo.svg" alt="">恭喜您注册成功！！<br/><br/>
	        在邮箱中验证后就可以登录了
	    </div>
	</div>
</template>

<script>
import {operateCode} from '@/assets/js/helper'
export default {
    name: 'regist',
    data(){
        return{
            flag: 0,
            warnings: {
                name: {
                    style: 'none',
                    info: '必填'
                },
                passwd:{
                    style: 'none',
                    info: '8-16'
                },
                email:{
                    style: 'none',
                    info: '暂不识别'
                }
            },
            pwd: '',
            confirmPwd: '',
            allowCondition: 15
        }
    },
    /* 
     * 只有四个input填充完毕才可以提交
     * nickname 1   0001
     * passwd   2   0010
     * email    4   0100
     * confirmPwd 8 1000
     当flag === 7时，才可以提交
     @parameter code 1/2/4
     @parameter condition 验证规则是否通过
     @parameter showWarn 是否显示提示信息
     */
    methods:{
        codeOperat(code, condition, showWarn = true){
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
            
            // 显示或是隐藏
            var warning = this.warnings,
                props;
            switch(code){
                case 1:
                    props = 'name';
                    break;
                case 2:
                    props = 'passwd';
                    break;
                case 4:
                    props = 'email';
                    break;
            }
            
            if(!showWarn) return;
            
            var temWarn = warning[props];
            // 符合条件，隐藏提示
            if(condition && temWarn.style != 'none')
                temWarn.style = 'none';
            // 不符合条件，显示提示
            else if(!condition && temWarn.style != 'block')
                temWarn.style = 'block';
        },
        confirmPassword(e, code){
            let condition = this.confirmPwd != '' && this.confirmPwd == this.pwd
            
            this.flag = operateCode(this.flag, code, condition)
            if(!condition)
                e.target.style.border = '0.01rem solid #fe0012'
            else
                e.target.style.border = ''
        },
        // 验证用户名
        checkName(e, code){
            var el = e.target,
                value = el.value,
                name = this.warnings.name,
                condition =  value != '' && value.length < 15;
            
            // 条件不成立
            if(!condition){
                if(value == '' && name.info != '必填'){
                    name.info = '必填';
                } else if(value.length > 15 && name.info != '长度<15'){
                    name.info = '长度<15';
                }
            }
            this.codeOperat(code, el.value != '' && el.value.length < 15);
        },
        // 验证密码的长度
        checkPwd(e, code){
            var el = e.target,
                value = el.value;
            
            this.codeOperat(code, 
                            value.length <= 16 && value.length >= 8)
        },
        // 输入邮箱时验证
        inputEmail(e){
            var el = e.target,
                email = this.warnings.email;
            
            // 隐藏邮箱相关的提示信息
            if(email.style != 'none'){
                email.style = 'none';
            }
            
            var flag = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test( el.value );
            
            // 验证邮箱的输入
            this.codeOperat(4, flag, false);
        },
        // 提交注册表单
        regist(){            
            if(this.flag != this.allowCondition) return;
            
            // 显示等待动画
            this.$store.commit('utile/setShowWaiting', true)
            
            var form = this.$el.querySelector('form'),
                registForm = new FormData(form);
            
            this.$axios({
                url: '/register',
                data: registForm,
                method: 'POST'
            }).then(response => {
                var data = response.data;
                // 成功的情况
                if(data.hasOwnProperty('state') && data.state == 'success'){
                    // 隐藏form，显示成功信息
                    this.$el.querySelector('form').style.display = 'none';
                    this.$el.querySelector('div.success-info').style.display = 'block';
                } else{
                    // 验证失败的情况
                    let message = ''
                    for(let i in data){
                        message = data[i]
                    }
                    this.$store.commit('utile/setPromptMessage', message) 
                }
            }).catch(error =>{
                new Error('灵异事件007');
            }).finally( ()=>{
                // 隐藏等待动画
                this.$store.commit('utile/setShowWaiting', false)
            })
        }
    }
}
</script>

<style lang="scss">
.regist-box{
    ul{
        padding-bottom: $little-space;
    }
    .regist-btn{
        display: block;
        @extend %button-filled-red;
        width: 2.4rem;
        height: 0.35rem;
        line-height: 0.35rem;
        margin: $mid-space auto;
    }
    .success-info{
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        border-top: 0.01rem solid #c6c6c6;
        img{
            display: inline-block;
            width: 0.35rem;
            height: 0.35rem;
        }
        text-align: center;
        font-size: 0.16rem;
        word-break: break-all;
        display: none;
        padding-bottom: 0.45rem;
        color: #FF9900;
    }
}
</style>
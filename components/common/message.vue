<!--消息提示组件
父组件需要监听clearMessage事件，将promptMessage设置成null
同一时间只能显示一条消息
父组件无需控制该组建的显隐
该组件根据父组件绑定的message值来确定显隐v-show
    message === null || message === undefined隐藏-->
<!--<message />-->
<template>
    <div v-show="promptMessage" class="prompt_message_wrap">
        <div :class="{prompt_message_blue: this.type === 'blue',prompt_message_red: this.type === 'red'}">{{promptMessage}}</div></div>
</template>


<script>
    export default{
        name: 'messageBox',
        props: {
            type: {
                default: 'blue' // 颜色样式
            }
        },
        computed:{
            promptMessage(){
                return this.$store.state.utile.promptMessage
            }
        },
        methods:{
            // 显示提示信息
            showMessage(){
                this.$Animate.animate(this.$el.querySelector('div'), {height: 35, opacity: 1}, 450, () => {
                    window.setTimeout(this.hidMessage, 1000)
                })
            },
            // 隐藏提示信息
            hidMessage(){
                this.$Animate.animate(this.$el.querySelector('div'), {height: 0, opacity: 0}, 450, (item) => {
                    item.style.width = '170px'
                    this.$store.commit('utile/setPromptMessage', undefined)
                })
            }
        },
        watch:{
            promptMessage(){
                if(this.promptMessage)
                    this.showMessage()
            }
        }
    }
</script>


<style lang="scss">
    .prompt_message_wrap{
        width: 100%;
        line-height: 0.35rem;
        text-align: center;
        position: absolute;
        top: 0.45rem;
        left: 0;
        font-size: 100%;
        position: fixed;
        z-index: 9999;
        div{
            margin-left: auto;
            margin-right: auto;
            height: 0;
            width: 2.7rem;
        }
        .prompt_message_blue{
            color: #3a7bd5;
            border: 0.01rem solid #3a7bd5;
            border-radius: 0.03rem;
        }
        .prompt_message_red{
            color: $red-color;
            border: 0.01rem solid $red-color;
            border-radius: 0.03rem;
        }
    }
</style>
<template>
    <div class="left_nav">
        <ul>
            <li><i class="icofont-home"></i> 首页</li>
            <li><i class="icofont-book-alt"></i> 教材</li>
            <li><i class="icofont-page"></i> 试题</li>
            <li><i class="icofont-speech-comments"></i> 论坛</li>
        </ul>
        <hr class="line"/>
        <ul>
            <li><i class="icofont-users"></i> 关于我们</li>
            <li><i class="icofont-send-mail"> 联系我们</i></li>
        </ul>
        <hr class="line"/>
        <ul>
            <li class="icofont-login"> 登录</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'sideBar',
        methods:{
            addEvent(){
                // 获取按钮
                var menu = document.querySelector('.menu'),
                    leftNav = document.querySelector('.left_nav'),
                    navigate = document.querySelector('.navigate');

                // 添加触摸事件, 弹出侧边导航
                menu.addEventListener('mouseenter', function(){
                    // 播放动画
                    window.Animate.animate(leftNav, {
                        width: 234,
                        finish: true,
                    }, 330)
                });
                menu.addEventListener('mouseleave', function(){
                    // 播放动画
                    window.Animate.animate(leftNav, {
                        width: 0,
                        finish: true,
                    }, 330)
                });
                // 鼠标移开侧边导航，收缩侧边导航
                leftNav.addEventListener('mouseleave', function(){
                    window.Animate.animate(this, {
                        width: 0,
                        finish: true
                    }, 430)
                });
                leftNav.addEventListener('mouseenter', function(){
                    window.Animate.animate(this, {
                        width: 234,
                        finish: true
                    }, 430)
                });
            }
        },
        mounted(){
           if( process.env.VUE_ENV != 'server' ){
               this.addEvent()
           }
        }
    }
</script>

<style lang="scss">
.left_nav{
    @extend %side_nav;
    width: 0px;
    height: 100%;
    z-index: 10;
    padding-top: 55px;
}
</style>
<!--等待动画-->
<!--type 颜色属性[blue|orange] 默认为orange-->
<!-- import waiting from '@/common/waiting' -->
<!-- <waiting :type="'blue'" v-show="showWaiting" /> -->
<template>
 <div 
    :style="{
        backgroundImage: this.bgImg,
    }" 
    :class="{blue_type: type == 'blue', orange_type: type == 'orange', 'loadding-animate': true}">
    <i></i><span>Loading...</span>
</div>   
</template>


<script>
    export default{
        name: 'waiting',
        props: {
            type: {
                default: 'orange'
            },
            bgImg: {
                defualt: 'radial-gradient(closest-corner, rgba(233,235,238, 0.9), transparent)'
            }
        }
    }
</script>


<style lang="scss">
$bounce-top: 1.2rem;
.loadding-animate{
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
/*    background-color: rgba(233,235,238, 0.4);*/
    span{
        margin-top: 15%;
        margin-left: 45%;
        position: fixed;
        top: $bounce-top - 0.13rem;
    }
    // 球的样式
    i{
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 0.25rem;
        position: fixed;
        margin-top: 15%;
        margin-left: 43%;
        font-size: 0.4rem;
        animation: bounce 700ms alternate infinite;
    }
    @keyframes bounce{
      0% {
        top: $bounce-top;
        height: 0.05rem;
        border-radius: 60px 60px 20px 20px;
        transform: scaleX(1.7);
      }
      35% {
        height: 0.25rem;
        border-radius: 50%;
        transform: scaleX(1);
      }
      100% {
        top: 0;
      }
    }
}
.orange_type{
    span{
        color: orange
    }
    i{
        background-color: orange;
    }
}
.blue_type{
    span{
        color: #3399CC
    }
    i{
        background-color: #3399CC
    }
}
</style>
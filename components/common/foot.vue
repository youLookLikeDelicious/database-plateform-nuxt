<template>
    <div class="foot">
        <div class="container">
            <div class="info">
                <a href="">联系我们</a>
                <a href="">帮助中心</a>
                <a href="">意见反馈</a>
            </div>
            <div class="copyright">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'foot'
    }
</script>

<style lang="scss">
.foot{
    width: 100%;
    height: 80px;
    color: #FFF0F0;
    font-size: 13px;
    margin-top: 12px;
    overflow: hidden;
    background-color: #222;
    .container{
        width: 950px;
        height: 60px;
        margin-top: 12px;
        margin-left: auto;
        margin-right: auto;
        .info{
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: right;
            a{
                margin-left: 12px;
                &:link, &:hover, &:visited{
                    color: white;
                }
            }

        }
        .copyright{
            height: 30px;
            line-height: 30px;
            text-align: right;
        }
    }
}
</style>
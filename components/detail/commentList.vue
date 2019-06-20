<template>
    <article class="comment_list">
        <article class="comment" v-for="(comment, index) in comments">
            <section>#{{index + 1}}</section>
            <div class="comment_content">
                <div class="stamp">
                    <img :src="comment.stamp" alt="">
                    <p>{{comment.name}}</p>
                </div>
                <div class="message">{{comment.content}}</div>
            </div>
            <div class="footer">回复</div>
        </article>
    </article>
</template>

<script>
    export default {
        name: 'commentList',
        props: ['comments']
    }
</script>


<style lang="scss">
    .comment_list{
        display: none;
        width: 98%;
        .footer{
            height: 0.12rem;
            font-size: 0.12rem;
            cursor: pointer;
            color: #777;
            text-align: right;
            margin-right: 0.12rem;
            margin-bottom: 0rem;
        }
    }
    .comment{
        padding-bottom: 0.17rem;
        border: 0.01rem solid #c6c6c6;
        border-radius: 0.07rem;
        box-shadow: 3px 7px 10px #c6c6c6;
        section{
            color: #777;
            text-align: right;
            width: 98%;
            margin: 0 auto 0.12rem auto;
        }
        &:not(first){
            margin-top: 0.24rem;
        }
    }
    .stamp{
        float: left;
        text-align: center;
        img{
            width: 0.45rem;
            height: 0.45rem;
            border-radius: 0.45rem;
        }
        p{
            font-size: 0.12rem;
            margin-left: 0.05rem;
            color: #AEAEAE;
        }
    }
    .comment_content{
        overflow: hidden;
    }
    .message{
        float: left;
        width: 4rem;
        margin-left: 0.21rem;
        line-height: 0.24rem;
        text-align: justify;
        text-indent: 2em;
        &:after{
            content: '';
            clear: both;
        }
    }
</style>
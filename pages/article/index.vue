<template>
    <div class="app">
        <div class="article_header">
            <h2 class="article_title">文章列表</h2>
            <p>谓心到，眼到，口到。心不在此，则眼看不仔细，心眼既不专一，却只漫浪诵读，决不能记，久也不能久也。三到之中，心到最急，心既到矣，眼口岂不到乎？</p>
        </div>
        <bread/>
        <article class="article_box" :id="'post-'+article.id" v-for="article in records">
            <section><a @click="showDetail(article.id)">{{article.title}}</a><span>{{article.created_at | formatDate}}</span></section>
            <header class="article_author_info">
                <img :src="$baseUrl + article.stamp" alt="">
                <span>{{article.nickname}}</span>
                <i>{{article.is_original | formatIsOriginal}}</i>
            </header>
            <p>{{article.summary}}</p>
            <div class="article_footer">
                <div class="article_tag">
                    <span v-for="tag in article.tags">{{tag}}</span>
                </div>
                <div class="article_visit">
                    <span><i class="icofont-speech-comments">{{article.commentNum}}</i></span>
                    <span><i class="icofont-eye"></i>{{article.visited}}</span>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
    import axios from '@/plugins/axios'
    export default{
        name: 'articles',
        data(){
            return {
                records: undefined,
                pagination: undefined
            }
        },
        asyncData(){
            return axios({
                method: 'GET',
                url: 'article/list'
            }).then( response=>{
                return response.data
            }).catch( ()=>{
                
            })
        },
        methods:{
            showDetail(id){
                this.$router.push({path: `/article/${id}`})
            }
        },
        mounted(){
            this.$store.commit('bread/setModule', '文章')
            this.$store.commit('bread/setPart',   '列表')
        }
    }
</script>

<style lang="scss">
    .article_header{
        margin-bottom: 0.24rem;
        h2{
            font-family: '楷体'
        }
        p{
            text-indent: 2em;
            margin-top: 0.12rem;
            width: 3.5rem;
            font-size: 0.13rem;
            color: #aaa;
        }
    }
    .article_box{
        width: 8rem;
        border-bottom: 1px solid #c6c6c6;
        margin-bottom: $big-space;
        position: relative;
        padding-bottom: 0.03rem;
        padding-top: 0.24rem;
        section{
            color: #121212;
            font-weight: bold;
            font-size: 0.18rem;
            margin-top: 0.12rem;
            margin-left: 0.12rem;
            margin-bottom: 0.12rem;
            span{
                color: #777;
                font-size: 0.12rem;
                padding-left: 0.12rem;
                font-weight: normal;
            }
        }
        p{
            margin-left: 0.12rem;
            margin-top: 0.07rem;
            text-indent: 2em;
            font-size: 0.15rem;
            line-height: 0.23rem;
        }
        &::after{
            z-index: -1;
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: radial-gradient(ellipse closest-side, rgba(255, 255, 255, 0.4) ,#F7F7F7), url(/img/bg_1.jpg);
            background-size: cover;
            opacity: 0.75;
            right: 0;
            top: 0;
        }
        
    }
    .article_author_info{
        margin-left: 0.12rem;
        img, span, i{
            vertical-align: middle;
        }
        img{
            width: 0.45rem;
            height: 0.45rem;
            border-radius: 0.45rem;
        }
        span{
            font-size: 0.14rem;
            margin-left: .03rem;
        }
        i{
            display: inline-block;
            width: 0.2rem;
            height: 0.2rem;
            font-size: 0.1rem;
            text-align: center;
            line-height: 0.2rem;
            color: #FF0033;
        }
    }
    .article_footer{
        overflow: hidden;
    }
    .article_tag{
        margin: 0.12rem 0 0.12rem 0.12rem;
        display: inline-block;
        float: left;
        span{
            font-size: 0.13rem;
            margin-right: 0.17rem;
            padding: 2px 5px;
            border: 1px dashed #777;
            border-radius: 0.07rem;
            cursor: pointer;
        }
    }
    .article_visit{
        color: #555555;
        margin: 0.12rem 0 0.12rem 0.12rem;
        float: right;
        padding: 0 5px;
        margin-right: 0.12rem;
        font-size: 0.13rem;
        span{
            margin-right: 0.12rem;
        }
    }
</style>
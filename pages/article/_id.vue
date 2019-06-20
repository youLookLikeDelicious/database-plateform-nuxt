<!--文章详情-->
<template>
    <div class="app">
        <bread/>
        <article class="not_fond_article" v-if="!article">该文章不存在</article>
        <div v-if="article">
            <article class="article_content_wrap">
                <header class="article_title">{{article.title}}</header>
                <header class="article_user_info">
                    <div><img :src="$baseUrl + userInfo.stamp" alt="stamp"></div>
                    <div>
                        <span> {{userInfo.nickname}}</span>
                        <p><span>创建日期 {{article.created_at | formatDate}}</span>
                        <span>阅读 {{article.visited}}</span>
                        <span>评论 {{article.comment_num}}</span></p>
                    </div>
                </header>
                <article v-html="article.content" class="article_content">
                </article>
            </article>
            <div class="comment_article_box">
                <umeditor :height="'100px'" @reciveUM="setUM" initMessage=""/>
                <section class="submit_article_comment_btn">
                    <a @click="submitComments({type: 'article', id: article.id})">提交</a>
                </section>
            </div>
            <div v-if="article.comment_num" class="comment_num">共 {{article.comment_num}} 条评论</div>
    <!--        文章评论-->
            <div class="article_comment_list_wrap">
                <commentList
                :appendComment="appendComment" 
                :commentable_type="'article'"
                :commentable_id="article.id"/>
            </div>
        </div>
    </div>
</template>


<script>
import axios from '@/plugins/axios'
import commentList from '@/components/commentList/commentList'
import umeditor from '@/components/common/umeditor'
import {serializeMessage} from '@/assets/js/helper'
export default{
    data(){
        return{
            article: undefined,
            userInfo: undefined,
            appendComment: false,
            UM: undefined,
        }
    },
    asyncData({params}){
        return axios({
            url: `article-detail/${params.id}`,
            method: 'GET'
        }).then( response=>{
            return response.data
        }).catch( ()=>{
            
        })
    },
    created(){
        // 使用正则替换上传到服务器上的图片路径
        if( this.article ){
            this.article.content = this.article.content.replace(/(\/images\/article)/mg, `${this.$baseUrl}$1`)
        }
        
    },
    components:{
        commentList,
        umeditor
    },
    methods:{
        // 提交对文章的评论
        submitComments({type, id}){
            if( !this.$store.state.userInfo.id ){
                this.$store.commit('loginRegist/setIsShow', true)
                return
            }
            
            let content = this.UM.getContent()
            if(content.trim() == ''){
                this.$store.commit('utile/setPromptMessage', '内容不能为空')
                return
            }
            this.$axios({
                url: '/comment/store',
                data: {
                    content: content,
                    user_id: this.$store.state.userInfo.id,
                    commentable_type: type,
                    commentable_id:   id
                },
                method: 'POST'
            }).then( response=>{
                if(response.data.state == 'success'){
                    this.appendComment = response.data
                    // 清空富文本内容
                    this.UM.setContent('')
                    return
                }
                this.$store.commit('utile/setPromptMessage', serializeMessage(response.data) )
            }).catch( ()=>{
                this.$store.commit('utile/setPromptMessage', '评论失败,未知错误')
            })
        },
        setUM(um){
            this.UM = um
        }
    },
    mounted(){
        this.$store.commit('bread/setModule', '文章')
        this.$store.commit('bread/setPart',   '详情')
    }
}
</script>


<style lang="scss">
    .article_content_wrap{
        .article_title{
            margin-left: auto;
            margin-right: auto;
            width: 7.8rem;
            font-size: 0.45rem;
            text-align: left;
            letter-spacing: 0.05rem;
        }
        .article_user_info{
            width: 7.8rem;
            text-align: left;
            color: #898989;
            margin-top: 0.24rem;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 0.24rem;
            div{
                display: inline-block;
                height: 0.45rem;
                vertical-align: middle;
                line-height: 100%;
                text-align: left;
                &:first-child{
                    margin-right: 0.12rem;
                }
            }
            p{
                margin-top: 0.07rem;
            }
            p span{
                font-size: 0.12rem;
            }
            span{
                font-size: 0.16rem;
            }
            img{
                width: 0.45rem;
                height: 0.45rem;
                border-radius: 100%;
            }
        }
        .article_content{
            width: 7.8rem;
            font-size: 0.16rem;
            text-align: left;
            margin-left: auto;
            margin-right: auto;
            line-height: 0.3rem;
        }
    }
    .not_fond_article{
        text-align: center;
        font-size: 0.18rem;
        color: #787878
    }
    .submit_article_comment_btn{
        text-align: right;
    }
    .submit_article_comment_btn a{
        @extend %comment_submit_btn
    }
    .comment_article_box, .comment_num{
        width: 6.5rem;
        margin-left: auto;
        margin-right: auto;
    }
    .comment_num{
        font-size: 0.14rem;
        color: #787878;
    }
    .comment_article_box{
        height: 1.5rem;
        margin-bottom: 0.55rem;
        margin-top: 0.25rem;
        padding-top: 0.12rem;
        border-top: 0.01rem solid #c6c6c6;
        box-sizing: border-box;
        .edui-container{
            z-index: 1 !important
        }
    }
    .article_comment_list_wrap{
        width: 6.65rem;
        margin-left: 2.83rem;
    }
</style>
<!-- 教材详情组件 -->
<template>
    <div class="app material_detail_wrap">
        <!--        面包屑-->
        <bread/>
        <!--        封面和先关属性-->
        <div class="detail_head">
            <div class="left_head">
                <img :src="$baseUrl + cover" />
                <section>
                    <span><i class="icofont-eye"> </i> {{visited}}</span>
                    <span>
                        {{type|typeFrom}}
                    </span>
                    <span><a class="icofont-heart-alt"> 收藏</a></span>
                    <span>
                        <a
                        @click="setCommentBoxVisible({condition: true, type: 'material', id: id})" 
                        class="icofont-comment"> 评论</a></span>
                </section>
            </div>
            <div class="right_head">
                <h3>{{title}}</h3>
                <section>上传:&nbsp;&nbsp;&nbsp;<a><img :src="$baseUrl + stamp" alt=""></a><a>{{nickname}}</a></section>
                <p v-if="!resource" class="prompt">如果您想查看隐藏内容，请在评论区 
                <span 
                @click="setCommentBoxVisible({condition: true, type: 'material', id:id})" class="icofont-comment">评论</span></p>
                <p v-if="resource">{{resource}}</p>
            </div>
        </div>
        <!--        课程详细介绍-->
        <div class="detail_content">
            <multTag :list="multTag" @clickTag="clickTag" :tagStyle="'red'" />
            <article class="introduce">
                <p>{{introduction}}</p>
            </article>
            <article class="chapter">
                <p>{{chapter}}</p>
            </article>
            <commentList 
            :appendComment="appendComment" 
            :commentable_id="id"
            :commentable_type="'material'"
            @setCommentBoxVisible="setCommentBoxVisible"/>
        </div>
        <commentBox v-if="showCommentBox" 
            :commentable_type="commentType"
            :commentable_id="commentId"
            @setCommentBoxVisible="setCommentBoxVisible"
            @commentSuccess="commentSuccess"/>
        <waiting :type="'orange'" v-if="showWaiting"/>
    </div>
</template>

<script>
    import commentBox from '@/components/common/commentBox'
    import axios from '@/plugins/axios'
    import multTag from '@/components/common/mult-tags'
    import commentList from '@/components/commentList/commentList'
    import waiting from '@/components/common/waiting'
    export default {
        name: 'detail',
        components: {
            multTag,
            commentBox,
            commentList,
            waiting
        },
        asyncData({params}) {
            return axios({
                url: `/material-detail/${params.id}`,
                method: 'GET'
            }).then(response => {
                return response.data
            }).catch(() => {

            })
        },
        data: () => {
            return {
                id: undefined,
                visited: undefined,
                title: undefined,
                nickname: undefined,
                type: undefined,
                cover: undefined,
                upper: undefined,
                introduction: undefined,
                resource: undefined,
                chapter: undefined,
                stamp: undefined,
                showCommentBox: false,
                showWaiting: false,
                appendComment: false,
                commentType: 'material',
                commentId: undefined,
                multTag: [
                    '课程介绍',
                    '章节目录',
                    '评论'
                ]
            }
        },
        methods: {
            // @param ind 多标签的索引，从0开始
            clickTag(ind) {
                // 元素行为的设置
                var articles = document.querySelectorAll('.detail_content>article') // 简介、评论和章节目录标签列表

                // 显示与li对应的内容，其他的内容隐藏
                for (let i = 0, len = articles.length; i < len; i++) {
                    articles[i].style.display = 'none'
                }

                articles[ind].style.display = 'block'
            },
            // 设置评论窗口的显隐
            setCommentBoxVisible({condition, type, id}){
                if(condition === true){
                    if( this.commentType !== type ){
                        this.commentType = type
                    }
                    if( this.commentId !== id ){
                        this.commentId = id
                    }
                }
                if(this.$store.state.userInfo.id === undefined){
                    this.$store.commit('loginRegist/setIsShow', true)
                    return
                }
                if(this.showCommentBox !== condition)
                    this.showCommentBox = condition
            },
            // 设置等待动画的显隐
            setShowWaiting(condition){
                this.showWaiting = condition  
            },
            // 获取评论后才能查看的resource
            getResource(){
                if( this.resource ) return
                this.setShowWaiting(true)
                this.$axios({
                    url:`material-resource/${this.id}`,
                    method: 'GET'
                }).then( response=>{
                    this.resource = response.data
                }).catch( ()=>{
                    
                }).finally( ()=>{
                    this.setShowWaiting(false)
                })
            },
            /* 
             * 评论成功
             * 评论组件追加新的评论
             * 请求resource
             */ 
            commentSuccess(comment){ 
                this.appendComment = comment
                this.getResource();
            }
        },
        mounted(){
            // 更改面包屑信息
            this.$store.commit('bread/setModule', '教材')
            this.$store.commit('bread/setPart',   '详情')
        }
    }

</script>

<style lang="scss">
    .detail_nav {
        font-size: 0.12rem;
        margin-left: 0.24rem;
    }

    .detail_head {
        font-size: 0.16rem;
        overflow: hidden;
        margin-top: 0.2rem;
        margin-left: 0.24rem;
    }

    .left_head {
        width: 5rem;
        float: left;
        color: #898989;
        font-size: 0.15rem;
        box-sizing: border-box;
        img {
            width: 5rem;
            height: 2.7rem;
            border-radius: 0.07rem;
        }
        section{
            padding-top: 0.07rem;
            text-align: justify;
            span, i{
                display: inline;
            }
        }
        span {
            position: relative;
            height: 0.15rem;
            line-height: 0.15rem;
            margin-right: 0.35rem;
        }

        .icofont-heart-alt {
            cursor: pointer;
        }
    }

    .right_head {
        height: 2.5rem;
        float: left;
        margin-left: 0.6rem;
        border-left: 1px solid #c6c6c6;
        padding-left: 0.2rem;
        font-size: 0.14rem;
        line-height: 0.45rem;
        p {
            height: 30px;
            word-wrap: break-word;
        }

        .bottom_info {
            font-size: 0.10rem;
        }
        section{
            line-height: 100%;
        }
        img{
            width: 0.45rem;
            height: 0.45rem;
            border-radius: 0.45rem;
        }
        .prompt {
            letter-spacing: 0.02rem;
            color: #c6c6c6;

            span {
                color: #FF9900;
                cursor: pointer;
            }
        }
    }

    .detail_content {
        width: 5.55rem;
        border-top: 1px solid #c6c6c6;
        border-radius: 0.07rem;
        margin-top: 0.24rem;
        margin-left: 0.24rem;

        ul {
            margin-top: 0.12rem;
            margin-bottom: 0.12rem;
            list-style: none;

            li {
                display: inline-block;
                cursor: pointer;
                padding-bottom: 0.05rem;
            }
        }
    }

    .introduce, .chapter {
        p {
            font-size: 0.16rem;
            text-indent: 2em;
            line-height: 0.23rem;
        }
    }

    .chapter {
        display: none;
    }
    .material_detail_wrap{
        .comment_list{
            display: none;
        }
    }
</style>

<!--教材的评论列表-->
<template>
    <article class="comment_list">
        <article class="comment" v-for="(comment, index) in comments">
            <section><span class="clear">{{comment.created_at|formatDate}}</span><span>#{{index + 1 + offset }}</span></section>
            <div class="comment_content">
                <div class="stamp">
                    <img :src="$baseUrl + comment.stamp" alt="">
                    <p>{{comment.nickname}}</p>
                </div>
                <div class="message" v-html="comment.content"></div>
            </div>
            <div class="footer" >
                <a v-if="comment.user_id == userId "
                @click="deleteComment(comment.id, comment.commentable_id)">删除</a>
                <a @click="replyComment({name: comment.nickname, commentId: comment.id,position: index})">回复</a>
            </div>
            <!--回复内容-->
            <div v-if="comment.replys"
                class="reply_content">
                <dl v-for="reply in comment.replys.list">
                    <dt>{{(comment.replys.to == null || reply.nickname == comment.replys.to)? reply.nickname + ':' : reply.nickname +'-回复-'+comment.replys.to}}</dt>
                    <dd v-html="reply.content"></dd>
                    <dd class="clear">
                        <a v-if="reply.user_id == userId "
                @click="deleteComment(reply.id, reply.commentable_id, 'comment')">删除</a>
                        <a @click="replyComment({name: comment.nickname, commentId: reply.id ,position: index})">回复</a>
                        </dd>
                    
                </dl>
            </div>
        </article>
        <div class="no_comment" v-if="!comments||comments.length === 0">暂无评论</div>
        <pagination :pageInfo="pageInfo" @changePage="getComments"/>
        <div class="reply_comment_box" slideto="120" data-direct="up">
             <umeditor 
                 :width="'90%'"
                 :height="'90px'" 
                 @reciveUM="reciveUM"
                 initMessage=""/>
             <div v-show="showReplyBtn" class="reply_btn"><a @click="toggleReplyBox">取消</a><a @click="submitReply">提交</a></div>
        </div>
        <waiting :type="'orange'" v-if="showWaiting"/>
        <message />
    </article>
</template>

<script>
    import umeditor from '@/components/common/umeditor'
    import waiting from '@/components/common/waiting'
    import pagination from '@/components/common/pagination'
    export default {
        name: 'commentList',
        props: ['commentable_id', 'appendComment', 'commentable_type'],
        data(){
            return{
                pageInfo: undefined,
                showWaiting: false,
                comments: [],            // 评论列表
                replys: [],
                replyIndex: 0,
                UM: undefined,
                showReplyBtn: false,
                replyCommentBox: '',
                replyTo: undefined,
            }
        },
        components:{
            pagination,
            waiting,
            umeditor
        },
        computed:{
            // 8 limit
            // 分页显示楼层数
            offset(){
                return (this.pageInfo.curPage - 1) * 10
            },
            userId(){
                return this.$store.state.userInfo.id
            }
        },
        watch:{
            appendComment(){
                this.getComments(9999)
            },
            
            /* 
             * 循环遍历回复
             * 回复教材|文章的评论 id=1  commentable_id = material.id = 1
             * ↑
             * 回复评论的评论      id = 2 commentable_id   1-1
             * ↑
             * 回复回【复评论的评论】的评论 commentable_id 1-1-2 （需要指定回复的谁）
             */
            replys(){
                // 清除comment的replys属性
                var comments = this.comments,
                    replys = this.replys;
                for(let i = 0, len = comments.length; i < len; i++){
                    comments[i].replys = null
                }
                for(let i = 0, j = 0, tmpJ = 0, len = replys.length; i < len; i++){
                    let commentableArray = (replys[i].commentable_id+'').split('-'),
                        lastId = commentableArray[commentableArray.length - 2],  // 回复的回复
                        commentable_id = commentableArray[1];
                    
                    while(true){
                        if(comments[j].id == commentable_id){
                            tmpJ = j
                            
                            if ( !comments[j]['replys'] ){
                                comments[j]['replys'] = {
                                    list: [],
                                    to: null
                                }
                            }
                            
                            comments[j]['replys'].list.push(replys[i])
                            // 评论回复的回复
                            // 需要指明回复的谁(三级回复)
                            // 二级回复无需指明
                            if( replys[i].commentable_id.match(/\-/g).length > 2 ){
                                comments[j]['replys'].to = 
                                    comments[j]['replys']
                                    .list
                                    .find(function(item){
                                        return item.id == lastId
                                     }).nickname
                            }
                        }
                        
                        if(++j >= comments.length){
                            // 下一次循环从tempJ开始
                            j = tmpJ
                            break
                        }
                    }
                }
            }
        },
        methods:{
            // 设置回复窗口的显隐
            toggleReplyBox(){
                if( this.showReplyBtn === false){
                    this.$Animate.animate(this.replyCommentBox, 'slideToggle', 430 , () => {
                        this.UM.setShow()
                        this.showReplyBtn = true
                    })
                } else{
                    this.UM.setHide()
                    this.$Animate.animate(this.replyCommentBox, 'slideToggle', 400)
                    this.showReplyBtn = false
                }
            },
            // 隐藏回复窗口
            hidReplyBox(){
                this.replyCommentBox.style.height = '0'
                this.replyCommentBox.setAttribute('data-direct', 'up')
                if( this.replyCommentBox.style !== 'block' ){
                    this.replyCommentBox.style.display = 'block'
                }
                this.showReplyBtn = false
                this.UM.setHide()
            },
            // 获取评论
            getComments(p = 1){
                // 显示等待动画
                this.setShowWaiting(true)
                this.$axios({
                    url: `/comment/get/${this.commentable_type}/${this.commentable_id}?p=${p}`,
                    method: 'GET'
                }).then( response=>{
                    let data = response.data
                    this.comments = data.records
                    this.pageInfo = data.pagination
                    this.replys   = data.replys
                }).catch( ()=>{
                    
                }).finally( ()=>{
                    this.setShowWaiting(false)
                })
            },
            setShowWaiting(condition){
                this.showWaiting = condition
            },
            /*
             * 删除评论
             * @param id             comment属性
             * @param commentable_id comment属性
             * @param commentable_type comment属性
             */
            deleteComment(id, commentable_id, commentable_type = this.commentable_type){
                if( !window.confirm('确定删除吗') ) return
                this.setShowWaiting(true)
                this.$axios({
                    url: 'comment/delete',
                    data:{
                        id: id,
                        commentable_id: commentable_id,
                        commentable_type: commentable_type,
                        type: this.commentable_type // 在删除回复的时候用得到
                    }, 
                    method: 'POST'
                }).then( (response)=>{
                    // 删除成功，重新请求当前页的评论内容
                    if(response.data == 'success'){
                        this.$store.commit('utile/setPromptMessage','删除成功')
                        this.getComments(this.pageInfo.curPage)
                        return
                    } else{
                        this.$store.commit('utile/setPromptMessage','删除失败')
                    }
                }).catch( ()=>{
                    this.$store.commit('utile/setPromptMessage','删除失败')
                }).finally( ()=>{
                    this.setShowWaiting(false)
                })
            },
            /*
             * 显示回复评论的富文本
             * @param commentable_id comment的commentable_id
             * @param name 回复的谁
             * @param position 回复标签的位置
             */
            replyComment({name, commentId, position}){
                // 如果用户没有登录，显示登录窗口
                if( !this.$store.state.userInfo.id ){
                    this.$store.commit('loginRegist/setIsShow', true)
                    return
                }
                let els = this.$el.querySelectorAll('.comment')
                // 回复的umeditor追加到另一个节点中
                if( els[position] !== this.replyCommentBox.parentElement && this.replyCommentBox.getAttribute('data-direct') == 'down' || this.replyTo !== commentId){
                    this.hidReplyBox()
                }
                // 设置回复的是谁
                if(this.replyTo != commentId){
                    this.replyTo = commentId
                }
                els[position].appendChild(this.replyCommentBox)
                this.toggleReplyBox()
            },
            // 提交回复
            submitReply(){
                // 获取回复的内容
                let content = this.UM.getContent()
                this.$store.commit('utile/setShowWaiting', true)
                this.$axios({
                    url: 'comment/store',
                    method: 'POST',
                    data:{
                        commentable_id: this.replyTo,
                        commentable_type: 'comment',
                        user_id: this.userId,
                        content: content,
                        type: this.commentable_type
                    }
                }).then( response=>{
                    let data = response.data
                    if( data.state == 'success' ){
                        this.$store.commit('utile/setPromptMessage', '评论成功')
                        this.hidReplyBox()
                        this.replys.push({
                            commentable_id: data.commentable_id,
                            user_id: this.userId,
                            nickname: this.$store.state.userInfo.nickname,
                            content: content,
                            id: data.id
                        })
                    }
                }).catch( (e)=>{
                    console.log(e)
                    this.$store.commit('utile/setPromptMessage', '评论失败')
                }).finally( ()=>{
                    this.$store.commit('utile/setShowWaiting', false)
                })
            },
            reciveUM(um){
                this.UM = um
            }
        },
        // 获取回复的umeditor
        // 隐藏umeditor
        mounted(){
            this.getComments()
            this.replyCommentBox = document.querySelector('.reply_comment_box')
        }
    }
</script>


<style lang="scss">
    .comment_list{
        width: 98%;
        .footer{
            height: 0.12rem;
            font-size: 0.12rem;
            color: #777;
            text-align: right;
            margin-right: 0.12rem;
            margin-bottom: 0.21rem;
            a{
                margin-left: 0.12rem;
            }
        }
        .no_comment{
            text-align: center;
            color:#c6c6c6;
        }
        .reply_comment_box{
            display: none;
            position: relative;
            box-sizing: border-box;
            // 重写umeditor的样式
            .edui-container{
                box-shadow: 0 0 0 #FFF;
                margin-left: auto;
                margin-right: auto
            }
            .edui-toolbar{
                background-color: transparent;
                box-shadow: 0 0 0 #fff;
                position: absolute;
                bottom: -.33rem;
                border-bottom: 0.01rem;
            }
            .edui-editor-body{
                position: relative;
            }
            .edui-emotion-wrapper{
                position: relative
            }
            .reply_btn{
                position: relative;
                color: #aeaeae;
                left: 5.3rem;
                bottom: 0rem;
                height: 0.24rem;
                a{
                    margin-left: 0.12rem;
                    font-size: 0.12rem;
                }
            }
        }
    }
    .comment{
        width: 6.5rem;
        background-color: #FFF;
        border: 0.01rem solid #c6c6c6;
        border-radius: 0.07rem;
        box-shadow: 3px 7px 10px #c6c6c6;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 0.12rem;
        box-sizing: border-box;
        section{
            padding-top: 0.12rem;
            color: #777;
            text-align: right;
            width: 98%;
            margin: 0 auto 0.12rem auto;
            span{
                &:first-child{
                    float: left;
                    font-size: 0.12rem;
                }
            }
        }
        &:not(first){
            margin-top: 0.24rem;
        }
        .reply_content{
            color: #AEAEAE;
            box-sizing: border-box;
            padding-left: 1rem;
            font-size: 0.12rem;
            dl dt, dl dd{
                display: inline-block;
            }
            dl{
                &:first{
                    margin-top: 0.12rem;
                }
                margin-bottom: 0.12rem;
                padding-top: 0.12rem;
                box-sizing: border-box;
                border-top: 0.01rem solid#c6c6c6;
                overflow: hidden
            }
            .clear{
                display: block;
                text-align: right;
                padding-right: 0.12rem;
                box-sizing: border-box;
                a{
                    margin-left: 0.12rem
                }
            }
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
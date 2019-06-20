<!--评论盒子-->
<!--<commentBox 
            :type="material"
            @setCommentBoxVisible="setCommentBoxVisible"
            @commentSuccess="commentSuccess"/>-->

<template>
    <div class="comment_box_wrap">
        <div class="comment_box">
            <header>
                <span>畅所欲言</span>
                <a @click="hidBox" class="icofont-ui-close clear"></a>
            </header>
            <umeditor @reciveUM="setUM" initMessage=""/>
            <section>
                <a @click="submit">提交</a>
            </section>
        </div>
        <message />
    </div>
</template>


<script>
import message from '@/components/common/message'
import umeditor from '@/components/common/umeditor'
import {serializeMessage} from '@/assets/js/helper'
export default {
    name: 'commentBox',
    props:['commentable_type', 'commentable_id'],
    data(){
        return {
            UM: undefined,
            promptMessage: undefined
        }
    },
    components:{
        umeditor,
        message
    },
    methods:{
        setUM(um){
            this.UM = um
        },
        // 提交评论
        submit(){
            this.$axios({
                url: '/comment/store',
                data: {
                    content: this.UM.getContent(),
                    user_id: this.$store.state.userInfo.id,
                    commentable_type: this.commentable_type,
                    commentable_id:   this.commentable_id
                },
                method: 'POST'
            }).then( response=>{
                if(response.data.state == 'success'){
                    this.$emit('commentSuccess', this.UM.getContent())
                    this.hidBox()
                    return
                }
                this.$store.commit('utile/setPromptMessage', serializeMessage(response.data) )
            }).catch( ()=>{
                this.$store.commit('utile/setPromptMessage', '评论失败,未知错误')
            })
        },
        // 设置评论窗口的显隐
        hidBox(){
            this.$emit('setCommentBoxVisible', false)
        }
    }
}
</script>


<style lang="scss">
    .comment_box_wrap{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0.5rem;
        left: 0;
        z-index: 999;
        .comment_box{
            width: 4.5rem;
            border: 0.01rem solid #c6c6c6;
            margin-left: auto;
            margin-right: auto;
            margin-top: 1.2rem;
            background-color: #ececec;
            box-sizing: border-box;
            padding: 0.07rem;
            border-radius: 0.05rem;
            header{
                font-size: 0.12rem;
                letter-spacing: 0.01rem;
                color: #676767;
                text-align: justify;
                margin-bottom: 0.12rem;
                a{
                    float: right;
                }
            }
            section{
                text-align: right;
            }
            section a{
                @extend %comment_submit_btn
            }
        }
    }
</style>
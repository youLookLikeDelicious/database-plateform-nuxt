<!--试题详情页-->
<template>
    <div class="app">
        <bread/>
        <article class="exam_detail">
            <h4 class="exam_detail_title">{{title}}</h4>
            <section>一、选择题</section>
            <choiceQuestion :questions="choiseQuestion"/>
            <section>二、简答题</section>
            <shortAnswerquestion :questions="shortAnswer"/>
        </article>
    </div>
</template>


<script>
import axios from '@/plugins/axios'
import choiceQuestion from '@/components/exam/choiceQuestion'
import shortAnswerquestion from '@/components/exam/shortAnswerquestion'
export default {
    name: 'examDetail',
    asyncData( {params} ){
      return axios({
          url: `/exam-detail/${params.id}`,
          method: 'GET'
      }).then( response=>{
          return response.data
      }).catch( ()=>{
          
      })
    },
    data(){
        return {
            title: undefined,
            visited: undefined,
            shortAnswer: undefined,
            choiseQuestion: undefined
        }
    },
    components:{
        choiceQuestion,
        shortAnswerquestion
    },
    mounted(){
        this.$store.commit('bread/setModule', '试题')
        this.$store.commit('bread/setPart',   '详情')
    }
}
</script>


<style lang="scss">
    .exam_detail_title{
        text-align: center;
        font-weight: 400;
        letter-spacing: 0.05rem;
        font-size: 0.21rem;
    }
    .exam_detail{
        width: 8rem;
        box-sizing: border-box;
        padding-right: 0.24rem;
        padding-left: 0.24rem;
        padding-bottom: 0.24rem;
        box-shadow: 0 0.07rem 0.12rem #c6c6c6;
        section{
            margin-top: 0.24rem;
            margin-bottom: 0.12rem;
        }
        // 显示答案的按钮
        .show_answer{
            font-size: 0.12rem;
            margin-top: 0.07rem;
            padding: 0.05rem 0.1rem;
            @extend %button-filled-red;
        }
    }
</style>
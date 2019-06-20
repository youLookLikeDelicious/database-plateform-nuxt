<!--选择题部分-->
<!--无需由父组件决定是否渲染v-if-->
<template>
    <div v-if="questions" class="choise_question_box">
        <dl v-for="(item, index) in questions">
            <dt>{{index + 1}}、{{item.subject}}</dt>
            <dd v-for="(choise, ind) in item.choise">
            {{String.fromCharCode(65 + ind)}}、
            <label><input :name="'choise_question_' + index" type="radio">{{choise}}</label></dd>
            <dd>
                <a 
                @click="showAnswer($event, item.answer)" class="show_answer">显示答案</a><span class="correct_answer"></span></dd>
        </dl>
    </div>
</template>


<script>
export default {
    name: 'choiceQuestion',
    /*[{
                subject:'规范化理论是关系数据库进行逻辑设计的理论依据，根据这个理论，关系数据库中的关系必须满足：每 一个属性都是（ ）。',
                choise:['长度不变的', '不可分解的', '互相关联的', '互不相关的'],
                answer: 0
        }]*/
    props: ['questions'],
    methods:{
        // 显示选择题的答案
        // @param e event
        // @param answer 答案
        showAnswer(e, answer){
            let el = e.target,
                siblingEl = el.nextElementSibling,
                elContent = '隐藏答案',
                siblingContent = '';
            if(siblingEl.innerHTML === ''){
                siblingContent = String.fromCharCode(65 + parseInt(answer))
            } else{
                elContent = '显示答案'
            }
            
            siblingEl.innerHTML = siblingContent
            el.innerHTML = elContent
        }
    }
}
</script>


<style lang="scss">
    .choise_question_box{
        dl dd{
            padding-left: 2em;
            padding-top: 0.03rem;
            padding-bottom: 0.03rem;
        }
        .correct_answer{
            margin-left: 0.24rem;
            color: $red-color;
            vertical-align: bottom;
        }
    }
</style>
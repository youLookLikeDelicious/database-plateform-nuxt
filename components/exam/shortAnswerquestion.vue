<!--选择题部分-->
<!--无需由父组件决定是否渲染v-if-->
<template>
    <div v-if="questions" class="short_answer_box">
        <article v-for="(item, index) in questions">
            <header>{{index + 1}}、{{item.subject}}</header>
            <content class="correct_answer" data-direct="up"><div>{{item.answer}}</div></content>
                <a @click="showAnswer($event)" class="show_answer">显示答案</a>
        </article>
    </div>
</template>


<script>
export default {
    name: 'shortAnswerquestion',
    /*[{
        subject:'举出适合用文件系统而不是数据库系统的例子；再举出适合用数据库系统的应用例子。',
        answer: '正确答案: 文件系统与数据库系统的区别： 文件系统面向某一应用程序，共享性差、冗余度大，独立性差，纪录内有结构、整体无结构，应用程序自己控制。 数据库系统面向现实世界，共享性高、冗余度小，具有高度的物理独立性和一定的逻辑独立性，整体结构化，用数据模型描述，由数据库管理系统提供数据安全性、完整性、并发控制和恢复能力。 读者可以参考《概论》书中表1.1 中的有关内容。 文件系统与数据库系统的联系是： 文件系统与数据库系统都是计算机系统中管理数据的软件。 *解析： 文件系统是操作系统的重要组成部分，而DBMS是独立于操作系统的软件。但是DBMS是在操作系统的基础上实现的。数据库中数据的组织和存储是通过操作系统中文件系统来实现的。 读者可以参考书中第十一章《数据库管理系统》。或者说，读者进一步学习数据库管理系统实现的有关课程（第十一章只是DBMS实现技术的概述）后可以对本题有深入的理解和全面的解答。因为DBMS的实现与操作系统中的文件系统是紧密相关的。例如，数据库实现的基础是文件，对数据库的任何操作最终要转化为对文件的操作。所以在DBMS实现中数据库物理组织的基本问题是如何利用或如何选择操作系统提供的基本的文件组织方法。这里我们就不具体展开了。',                    
    }]*/
    props: ['questions'],
    methods:{
        showAnswer(e){
            let el = e.target.previousElementSibling
            
            this.$Animate.animate(el, 'slideToggle')
        }
    }
}
</script>


<style lang="scss">
    .short_answer_box{
        .correct_answer{
            padding-left: 3.7em;
            padding-top: 0.03rem;
            padding-bottom: 0.03rem;
            line-height: 0.27rem;
            letter-spacing: 0.02rem;
            box-sizing: border-box;
            overflow: hidden;
            display: none;
        }
        .show_answer{
            margin-left: 0.32rem
        }
        article{
            margin-top: 0.12rem;
        }
    }
</style>